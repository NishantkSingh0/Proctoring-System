import asyncio
import websockets
import base64
import cv2
import numpy as np
from ProcessFrames import Process

# processing=0
PORT = 8765
ALLOWED_ORIGINS = {
    "http://localhost:5173",
    "https://nishantksingh0.github.io"
}

# Lower frame dimensions for better performance and reduced bandwidth
FRAME_WIDTH = 360
FRAME_HEIGHT = 270
# Compression quality for JPEG encoding (0-100, lower = smaller file size but less quality)
JPEG_QUALITY = 80

async def handle_client(websocket):
    try:
        # For newer websockets versions
        origin = websocket.origin or ''
    except AttributeError:
        try:
            # Fallback for even newer versions
            origin = websocket.request.headers.get('Origin', '')
        except AttributeError:
            # Last resort fallback
            origin = ''
            print("⚠️ Could not determine origin, allowing connection")
    
    if origin and not any(origin.startswith(o) for o in ALLOWED_ORIGINS):
        await websocket.close(code=1008, reason="Forbidden origin")
        print(f"❌ Connection rejected from origin: {origin}")
        return

    print(f"✅ Connection accepted from {origin}")

    # Frame rate limiter variables
    last_processed_time = 0
    min_frame_interval = 1000 / 18  # ~55.5ms for 18 FPS

    try:
        async for message in websocket:
            try:
                # Check if we need to skip this frame for frame rate limiting
                current_time = asyncio.get_event_loop().time() * 1000
                elapsed_time = current_time - last_processed_time
                
                if elapsed_time < min_frame_interval:
                    # Skip this frame to maintain desired frame rate
                    continue
                
                last_processed_time = current_time
                
                # Clean up base64 data
                base64_data = message
                
                # If it still contains the data URI prefix, remove it
                if "base64," in base64_data:
                    base64_data = base64_data.split("base64,")[1]
                
                # Ensure the base64 string has proper padding
                missing_padding = len(base64_data) % 4
                if missing_padding:
                    base64_data += '=' * (4 - missing_padding)
                
                try:
                    # Decode base64
                    img_data = base64.b64decode(base64_data)
                    np_arr = np.frombuffer(img_data, np.uint8)
                    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

                    if frame is None:
                        raise ValueError("Could not decode image after base64 decoding succeeded.")
                    
                    # Ensure frame is at the expected dimensions
                    if frame.shape[1] != FRAME_WIDTH or frame.shape[0] != FRAME_HEIGHT:
                        frame = cv2.resize(frame, (FRAME_WIDTH, FRAME_HEIGHT))

                    # Process image using user-defined function
                    try:
                        # processing+=1
                        processed_frame = Process(frame)
                        # print('Processing Frames ',processing)
                    except Exception as proc_error:
                        print(f"⚠️ Error in Process function: {str(proc_error)}")
                        # If processing fails, use the original frame
                        processed_frame = frame
                        
                    # Make sure the processed frame is not empty
                    if processed_frame is None or processed_frame.size == 0:
                        print("⚠️ Process function returned empty frame, using original")
                        processed_frame = frame

                    # Optimize frame encoding:
                    # 1. Resize if necessary to ensure consistent dimensions
                    if processed_frame.shape[1] != FRAME_WIDTH or processed_frame.shape[0] != FRAME_HEIGHT:
                        processed_frame = cv2.resize(processed_frame, (FRAME_WIDTH, FRAME_HEIGHT))
                    
                    # 2. Apply slight blur to improve compression (optional, can be removed if image quality is critical)
                    # processed_frame = cv2.GaussianBlur(processed_frame, (3, 3), 0)
                    
                    # 3. Encode with optimized parameters
                    encode_params = [cv2.IMWRITE_JPEG_QUALITY, JPEG_QUALITY]
                    _, buffer = cv2.imencode('.jpg', processed_frame, encode_params)
                    processed_base64 = base64.b64encode(buffer).decode('utf-8')

                    # Send processed frame
                    await websocket.send(processed_base64)
                    
                except base64.binascii.Error as be:
                    print(f"⚠️ Base64 decoding error: {str(be)}")
                    await websocket.send(f"error:Base64 decoding failed: {str(be)}")
                
                except Exception as img_e:
                    print(f"⚠️ Image processing error: {str(img_e)}")
                    await websocket.send(f"error:Image processing failed: {str(img_e)}")

            except Exception as e:
                error_msg = f"⚠️ Error processing frame: {str(e)}"
                print(error_msg)
                await websocket.send("error:" + str(e))

    except websockets.ConnectionClosed as e:
        print(f"🔌 Client disconnected: {e.reason}")
    except Exception as e:
        print(f"❗ Unexpected error: {str(e)}")

async def main():
    # Reduced max_size parameter (from 2**22 to 2**20) to match the smaller frame size
    # Increased ping_timeout for more reliable connections
    print(f"WebSocket server running at ws://localhost:{PORT}")
    print(f"Frame dimensions: {FRAME_WIDTH}x{FRAME_HEIGHT} at 18 FPS")
    
    async with websockets.serve(
        handle_client, 
        "localhost", 
        PORT, 
        max_size=2**18,  
        ping_interval=30,
        ping_timeout=60   
    ):
        await asyncio.Future()  # Keeps the server running forever

if __name__ == "__main__":
    asyncio.run(main())