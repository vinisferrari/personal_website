document.addEventListener("DOMContentLoaded", () => {
    const background = document.querySelector(".reveal-background");
    const revealText = document.querySelector(".reveal-text");
    const typingText = document.querySelector(".typing-text span");
    const animationDuration = 10000; // Total duration of the completed animation cycle (typing + reveal)

    function resetAnimation() {
      // Reset the background and text opacity after the animation has completed
      //if not have repetition comment this code block
      setTimeout(() => {
        background.style.width = "0%"; // Collapse the reveal background
        background.style.transform = "translateX(0%)"; // Reset transform position
        revealText.style.opacity = 0; // Hide the reveal text
        typingText.style.transition = "color 1s ease-in-out";
      }, 9000); // Wait until the current animation cycle is completed before resetting

      // Apply the original animation
      typingText.style.animation = "typing 4s steps(40, end) forwards, blink-caret 0.75s step-end infinite"; // Reapply typing and caret blink animations
      typingText.style.borderRight = "2px solid"; // Reset the cursor effect
      typingText.style.transition = "none";
      typingText.style.color = "white"; // Reset the text color

      // Start the reveal effect
      setTimeout(() => {
        typingText.style.animation = "none"; // Pause the typing animation during the reveal
        background.style.width = "100%"; // Expand the reveal background
        typingText.style.borderRight = "none"; // Hide the cursor effect
      }, 4000); // Delay to match the typing animation duration

      setTimeout(() => {
        background.style.transform = "translateX(calc(100% + 0.5ch))"; // Slide out the reveal background
        typingText.style.transition = "color 1s ease-in-out";
        revealText.style.opacity = 1; // Show the reveal text
        typingText.style.color = "gray"; // Change the text color after transition
      }, 5000); // Delay to match the background transition duration
    }

    // Start the animation and set it to repeat indefinitely
    resetAnimation();
    setInterval(resetAnimation, animationDuration); // Repeat the animation cycle indefinitely

  });