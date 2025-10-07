import random

# In a real implementation, we would use GPT or another language model
# to generate personalized captions based on the detected emotion

def generate_mood_caption(emotion, text=None):
    """
    Generate a caption or quote based on the detected emotion.
    
    Args:
        emotion (str): The detected emotion
        text (str, optional): Original text input, if available
        
    Returns:
        str: A caption or quote related to the emotion
    """
    # In a real implementation, we would use:
    # OpenAI API or similar LLM
    # import openai
    # openai.api_key = os.getenv("OPENAI_API_KEY")
    # prompt = f"Generate a short, inspiring quote about feeling {emotion}."
    # if text:
    #     prompt += f" Context: {text}"
    # response = openai.Completion.create(model="text-davinci-003", prompt=prompt, max_tokens=50)
    # return response.choices[0].text.strip()
    
    # For demo purposes, we'll use predefined quotes for each emotion
    captions = {
        "happy": [
            "Sunshine mixed with a little hurricane.",
            "Happiness is not by chance, but by choice.",
            "The best is yet to come.",
            "Life is better when you're laughing.",
            "Radiating joy from the inside out."
        ],
        "sad": [
            "Even the darkest night will end and the sun will rise.",
            "It's okay not to be okay sometimes.",
            "Behind every strong person is a story that gave them no choice.",
            "The wound is the place where the light enters you.",
            "Sadness flies away on the wings of time."
        ],
        "angry": [
            "Speak when you are angry and you will make the best speech you will ever regret.",
            "For every minute you are angry, you lose sixty seconds of happiness.",
            "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.",
            "The best fighter is never angry.",
            "Holding onto anger is like drinking poison and expecting the other person to die."
        ],
        "neutral": [
            "Balance is not something you find, it's something you create.",
            "Simplicity is the ultimate sophistication.",
            "In the middle of difficulty lies opportunity.",
            "Life is really simple, but we insist on making it complicated.",
            "The quieter you become, the more you can hear."
        ],
        "surprised": [
            "Life is full of surprises and serendipity.",
            "The best things happen unexpectedly.",
            "Sometimes the smallest things take up the most room in your heart.",
            "Surprise is the greatest gift which life can grant us.",
            "The unexpected is what changes our lives."
        ],
        "fearful": [
            "Fear is only as deep as the mind allows.",
            "Everything you want is on the other side of fear.",
            "Courage is resistance to fear, mastery of fear, not absence of fear.",
            "Fear is a reaction. Courage is a decision.",
            "The cave you fear to enter holds the treasure you seek."
        ]
    }
    
    # Default to neutral if emotion not found
    emotion_captions = captions.get(emotion, captions["neutral"])
    
    # Return a random caption for the emotion
    return random.choice(emotion_captions)