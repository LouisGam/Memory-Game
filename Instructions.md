# Steps to Creating the Memory Game

## Project Setup

1. Create an empty project folder within repos/
1. Create a folder within that called `images`
1. Go to a site like pexels.com (somewhere that has free images for download)
1. Find some images you like that will test the player's memory
1. Download 10-20 free images and save them in your `images` folder
1. Open your terminal to the project folder (the folder that holds `images`, NOT the `images` folder)
1. `npm create vite@latest`
   - For Project Name, simply answer `.`
   - When it says the current directory is not empty, choose to `Ignore files and continue`
   - For Package Name, leave the suggested name, hit enter
   - For framework, choose React
   - For variant, choose JavaScript
1. `npm install`
1. `git init`
1. `git add .`
1. `git commit -m "project setup"`
1. Go to github.com and create a new, empty repository
1. Copy the 3 lines under `…or push an existing repository from the command line`
1. Paste them into the terminal and hit enter

## Setup Image Imports

1. Directly underneath the import statements, create a new line which creates a variable and sets it equal to `import.meta.glob("../images/*")`
1. Then create a second variable and use `Object.keys()` to get an array of all the keys from the first variable.

### Verify the images will work

1. Test that the second variable is working correctly by console logging it.
   - It should have all the image filepaths that point to each of the images you downloaded
1. Render each image onto the screen
   - Inside the return statement, use curly braces to invoke `.map()` on the second variable
   - Create a callback function for `.map()` which returns `<img />` tags
   - The `<img />` tags should have a `src` attribute set equal to the value of each item in the array
1. Once you feel comfortable displaying the images on the screen, you can remove that code if you'd like. It was just to deepen your understanding of the image imports and to test that they work

## Create a static version of the page layout

Keep in mind, there are many different memory games you could decide to make. These are just general questions to help guide your thinking

1. What should the title be? Make an `<h1>` tag for that
1. Do you want to display a running count for how many correct guesses the user has made?
   - How should you display that?
   - What html tag(s) should you use?
1. You'll need to display one of the images at a time, or perhaps a grid of images that you plan to flip (this is harder)
   - Create an `<img>` tag for that and test that it works
   - It might be worth applying some styling to keep the images from taking up too much space
1. You'll need to prompt the user somehow, to test their memory
   - This might include Yes/No buttons
   - This might include making the images themselves into clickable buttons

Ultimately, you're trying to make a mockup of the final design. This should help you to think through the goal of the game as well as the layout

## General Next Steps

<sup><sub> What information should be state? https://react.dev/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state </sub></sup>

1. You'll need state variables
   - What information will you need to track over time, even as your page changes/responds to the user's input?
1. You'll need to replace certain pieces of the static layout with variables (state or derived state)
   - This enables your display to react/respond to changes in state
1. You'll need to determine if the player lost the game, is still playing, or has won the game
   - Obviously this will depend on how you want the game to function
1. You'll need to be able to handle the user's various inputs
   - Generally this requires making functions that are attached to buttons or form elements via the event listeners.
     - onClick, onSubmit, onChange... etc
   - Often these functions will update the state variable(s) in some way
     - Remember that changes to state trigger a re-render. This is how you update the display, too
