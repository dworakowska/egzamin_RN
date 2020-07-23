## Lab 1

### Setup and warm-up for coding in React Native

- create a new application: `PokeDex`
- create new GitHub repository `PokeDex-RNPB`
- add git repository to application

#### run project

##### Android:

- open `$projectsDirectory/PokeDex/android` in Android Studio, do not go inside this directory, just open it in AS.
- Create a new Android device, with **PIE (SDK 28 + Google play API)**
  -- optionally remove frames, to save desktop space, we won't need them
- if everything works fine just type in your terminal window: `npx react-native run android`
  -- if for some reason it doesn't work, try run button in AS

##### iOS:

- open `$projectsDirectory/PokeDex/ios` in XCode. Wait until indexing is over, it can take a while.
- select desired simulator device (_iPhone SE 2nd gen. is fine_)
- you can type: `npx react-native run-ios` in your terminal or just click on the play button in XCode

After all that you are almost there to start writing some code!

Let's see how to open the dev menu. On any screen just press:

- Android: `CTRL + M` or `CMD + M`
- iOS: `CMD + D`
  There is two main option, that is interesting for us:
- Reload - works like a refreshing browser
- Start / Stop JS Debugging - it allows us to see what happens in-app
- I highly recommend disabling _Fast Refreshing_

There is also a shortcut to reload app:

- Android: double-tap `R`
- ios: `CMD + R`

### Coding part

1. Change something on the main screen and reload the app, just test if everything works
   1.a _optionally remove flow_
2. Remove everything from `const App`, just leave it as an empty function
3. Remove imports from `react-native/Libraries/NewAppScreen` we won't need them anymore
4. We can also remove everything inside styles, same here, we won't use them
5. Create `components` folder
6. Create `apiService.js` file
7. First, create a container:
   - StatusBar
   - SafeAreaView
   - View
   - Text
8. Add some styles to make it look nice (at this point treat is only as exercise)
9. Move to `apiService.js` and add fetch function
   - We will use PoeApi to create PokeDex: [https://pokeapi.co/](https://pokeapi.co/)
   - Create an async fetch function
   - fetch URL: https://pokeapi.co/api/v2/pokemon/
10. Move to App.js
    - fetch data
    - console log it
    - put data into state
    - add `FlatList`
    - render `FlatList` with data, just `name` for now
11. Create a PokeDex List Item component:
    - name
    - style it
12. Use this component in FlatList renderer
13. Style it nicely (at this moment there is no design)
14. Change item to a button
15. On button, press fetch pokemon data
16. After fetch display alert with OK button and pokemon `id, type or types and weight`

## Lab 2

[https://www.figma.com/file/oIEzr0GaNDfcBKsLIhVMsi/pokedex-app-iphone-x-daniel-motta?node-id=0%3A1](https://www.figma.com/file/oIEzr0GaNDfcBKsLIhVMsi/pokedex-app-iphone-x-daniel-motta?node-id=0%3A1)

1. Install: [https://github.com/react-native-community/async-storage](https://github.com/react-native-community/async-storage)
2. Set and get data form AsyncStorage
3. Load full list of pokemons from API to asyncStore
4. Create hook for asyncStorage operations
5. Use this hook ^^
6. Add FlatList header
7. Add input to header and set it's placeholder to 'search'
8. Add filtering pokemons function
9. Pass function to list header with filtering stored pokemons
10. Add debounce to filtering function: [https://css-tricks.com/debouncing-throttling-explained-examples/](https://css-tricks.com/debouncing-throttling-explained-examples/)
11. Add hook for debouncing and use it
12. Add refresh action: load whole pokemons list and store it in AsyncStorage
13. Add background task for loading pokemons details:
    - show spinner while loading image
    - save data in asyncstore
    - if data is in asyncStore do not load new one
    - show image, when it is in asyncStore

## Lab 3

1. Create hook for asyncStorage operations
2. Add background task for loading pokemons details:
   - show spinner while loading image
   - save data in asyncstore
   - if data is in asyncStore do not load new one
   - show image, when it is in asyncStore
3. Add Navigation
   - HomeScreen
   - DetailsScreen
   - Stack navigation
4. Add Pokemon Details Page
