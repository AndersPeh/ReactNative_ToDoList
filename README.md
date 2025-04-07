This is a simple, final version of a Todo List app built with React Native and Expo. It allows you to add tasks with a title and description, view a list of your tasks, and save everything using AsyncStorage. 
It’s designed to help users keep track of everyday tasks in a straightforward and clean interface.

## Features

- **Add New Todo:** Quickly add tasks with a title and description.
- **Persistent Storage:** Tasks are stored locally so your list doesn’t disappear on app restart.
- **Default Task List:** A few default tasks are loaded on first launch.
- **Navigation:** Simple, clean navigation between the Home and Add New Todo screens.
- **Responsive UI:** Designed for a pleasant experience on Android.

## Project Structure

- **App.js:** The main entry point that sets up navigation using React Navigation.
- **src/screens/Home.js:** The home screen shows the list of tasks and has logic to load tasks from AsyncStorage.
- **src/screens/AddNewToDo.js:** This screen provides the UI for adding a new task.
- **src/components/** Contains smaller components like the header, list items, and various buttons.
- **src/constants/** Holds styling information and layout constants used throughout the app.

## How It Works

- The **Home screen** fetches saved tasks from AsyncStorage during its initial render. If there are no tasks, some default tasks are set up.
- When you navigate to **Add New Todo**, you can add a title and description. Once you save, the new task is sent back to the Home screen where it’s saved and displayed.
- All components are styled to offer a simple and clean user experience, with consistent spacing and color schemes defined in the constants.
