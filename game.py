import random

def guessing_game():
    lower_limit = 1
    upper_limit = 100
    number = random.randint(lower_limit, upper_limit)
    attempts = 0
    history = []
    hot_cold_threshold = 10

    print("Welcome to the Advanced Guessing Game!")
    print(f"I'm thinking of a number between {lower_limit} and {upper_limit}.")
    print(f"You have 7 attempts to guess the number. Let's begin!")

    while attempts < 7:
        guess = int(input("Enter your guess: "))
        attempts += 1
        history.append(guess)

        if guess < number:
            print("Too low!")
        elif guess > number:
            print("Too high!")
        else:
            print(f"Congratulations! You guessed the number {number} in {attempts} attempts.")
            break

        remaining_attempts = 7 - attempts
        if remaining_attempts > 0:
            print(f"You have {remaining_attempts} attempts left.")

            # Check if the guess is getting closer or farther from the number
            if attempts > 1:
                prev_guess = history[-2]
                prev_distance = abs(number - prev_guess)
                curr_distance = abs(number - guess)

                if curr_distance < prev_distance:
                    print("Getting warmer!")
                elif curr_distance > prev_distance:
                    print("Getting colder!")
                else:
                    print("Same distance as before!")

            # Check if the guess is within the hot-cold threshold
            if abs(number - guess) <= hot_cold_threshold:
                print("You're getting hot!")
            else:
                print("You're getting cold!")

            # Provide a hint by revealing whether the number is divisible by the guess
            if number % guess == 0:
                print("Hint: The number is divisible by your guess!")
            else:
                print("Hint: The number is not divisible by your guess!")

    if attempts == 7 and guess != number:
        print(f"Sorry, you ran out of attempts. The number was {number}.")

    print("Game Over")
    print(f"The number was {number}.")
    print("Your guess history:")
    print(history)

guessing_game()
