# React Hooked Store

[![Build Status](https://travis-ci.org/marcingajda/react-hooked-store.svg?branch=master)](https://travis-ci.org/marcingajda/react-hooked-store)
[![Coverage Status](https://coveralls.io/repos/github/marcingajda/react-hooked-store/badge.svg?branch=master)](https://coveralls.io/github/marcingajda/react-hooked-store?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/marcingajda/react-hooked-store/badge.svg?targetFile=package.json)](https://snyk.io/test/github/marcingajda/react-hooked-store?targetFile=package.json)

Simple library that embrace the power of Context API and hooks to give you a
powerful method to manage the global state in your React applications.

## Installation

```
npm install --save react-hooked-store
```

## Manual

### Simple usage

First create a hooked store:

```
const firstHookedStore = createStore({
  flag: true, // store initial value
});
```

Now provide the store to one of your application component.
You can use the `StoreProvider` component to do it.

```
<StoreProvider store={firstHookedStore}>
  <ApplicationComponent />
</StoreProvider>
```

Finally use the hooked store inside the component

```
const [state, updateState] = useStore(firstHookedStore);

updateState({flag: !state.flag})
```

As you can see the Hooked Store works here like `setState` hook.

### Hooked Store with reducer

Lets see now how we can make a hooked store that will work like `useReducer` hook. 
It will allow to dispatch actions that will be interpreted by a reducer.

First make a new store, this time with a reducer passed as the second argument:

```
function reducer(prevState, action)) => {
  if(action === 'INCREMENT') {
    return {
      ...prevState
      counter: prevState.counter + 1
    }
  }

  return {...prevState}
}

const secondHookedStore = createStore({
  counter: 0,
}, reducer);
```

Provide the newest store to your application:

```
<StoreProvider store={secondHookedStore}>
  <ApplicationComponent />
</StoreProvider>
```

Then use it by passing actions to the dispatcher.

```
const [state, dispatch] = useStore(secondContextStore);

dispatch('INCREMENT')
```

As you can see an action does not have to be an object.

### Provide many stores at once

Mostly you will be providing stores to the root of your application. 
Having multiple nested providers there can be problematic.
Because of that React Hooked Store comes with `StoreComposer` 
that allow you to provide many stores at once.

 ```
 <StoreComposer stores={[
   firstHookedStore,
   secondHookedStore,
 ]}>
   <ApplicationComponent />
 </StoreComposer>
 ```
 
## Example

To run the example project clone this repository and use those commands:

```
npm install
npm run example
```
 
## Development
 
For library compilation use those commands:

```
npm run build
npm run build:watch
```
 
Remember to run tests after changing something:

```
npm run test
npm run test:mutate
```

Keep the code quality great with those commands:

```
npm run lint
npm run lint:test
```
 
## License

[MIT](LICENSE.md)



