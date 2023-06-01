from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS
import playsound
import random
import os
from gtts import gTTS
import ffmpeg


ffmpeg_binary = 'C:/ffmpeg/bin'
# ffmpeg.set_ffmpeg_binary(ffmpeg_binary)


def delete_all_captchas():
    dir = './uploads'
    for f in os.listdir(dir):
        try:
            os.remove(os.path.join(dir, f))
        except PermissionError:
            continue

def get_random_char():
    # List of Devanagari characters
    chars = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज', 'झ', 'ट', 'ठ', 'ड', 'ढ', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह', 'क्ष' , 'ज्ञ']
    
    # Return a random character
    return random.choice(chars)


def generate_captcha():
    # Set the width and height of the image
    width, height = 250, 80
    
    # Create a new image
    image = Image.new('RGB', (width, height), color = (255, 255, 255))
    
    # Create a draw object
    draw = ImageDraw.Draw(image)
    
    # Set the font size and font file
    font_size = 40
    font_file = './font.ttf'
    
    # Create a font object
    font = ImageFont.truetype(font_file, font_size)
    
    # Generate 4 random Devanagari characters
    chars = [get_random_char() for i in range(5)]
    captcha_string ="".join(chars)
    
    print("DEVNAGARI CAPTCHA",captcha_string)
    
    # Draw the characters on the image
    for i in range(5):
        x = 50 * i + 10
        y = random.randint(10, 20)
        draw.text((x, y), chars[i], fill = (0, 0, 0), font = font)
        
    # Add noise to the image
    for i in range(400):
        x = random.randint(0, width - 1)
        y = random.randint(0, height - 1)
        draw.point((x, y), fill = (0, 0, 0))
        
    delete_all_captchas()    
    # Save the image
    image.save('./uploads/{}.png'.format(captcha_string))
    return captcha_string


def delete_mp3():
    directory= './uploads/audio'

    for filename in os.listdir(directory):
        if filename.endswith('.mp3'):
            file_path = os.path.join(directory, filename)
            os.remove(file_path)
            print(f"Deleted {filename}")


def generate_mp3(captcha_string):
    delete_mp3()
    tts=gTTS(text=captcha_string,lang='mr',slow=1000)
    audio_file = "./uploads/audio/"+captcha_string+".mp3"
    tts.save(audio_file)


# def generate_mp3(devanagari_text):
#     # delete_mp3()
#     # Create a directory to store temporary files
#     os.makedirs("temp", exist_ok=True)

#     for char in devanagari_text:
#         text = char + " "
#         tts = gTTS(text, lang='hi')
#         tts.save(f"temp/{ord(char)}.mp3")

#     # Concatenate all the individual character MP3 files
#     command = "ffmpeg -y -i 'concat:"
#     # for char in devanagari_text:
#     #     command += f"temp/{ord(char)}.mp3|"
#     # command = command[:-1] + "' -c copy upload/audio/"+ devanagari_text + ".mp3"
    
#     # input_args=[]
#     # for char in devanagari_text:
#     #     input_args.extend(["-i", f"temp/{ord(char)}.mp3"])
#     # # "./uploads/audio/"+ devanagari_text +
#     # print(*input_args)
#     # ffmpeg.input(*input_args).output("devanagari_text.mp3", format="mp3").run()

#     # Execute the FFmpeg command to merge the MP3 files
#     # os.system(command)

#     # # Clean up temporary files
#     # for char in devanagari_text:
#     #     os.remove(f"temp/{ord(char)}.mp3")
#     # os.rmdir("temp")

#     print(f"MP3 file './uploads/audio/{devanagari_text}.mp3' generated successfully!")
