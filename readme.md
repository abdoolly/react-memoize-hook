# React Memoize Hook

### This is a simple library that exposes a custom made hook which is similar to the `useMemo` hook in react but , it accepts parameters so , it's flexible and easy enough to use anywhere

## Installation

```
yarn add react-memoize-hook

or

npm i react-memoize-hook
```

## Base usage

```
import  { useMemoize } from "react-memoize-hook";

let heavyComputeFunction = useMemoize((args) => { // do some heavy operations here});

// now after using the heavyComputeFunction at any place
// it will cache the args and the values so , you won't need to recomputer everytime
```

**NOTE:** Hooks should always be called inside your functional component.

## Example

### Problem

here is a code that is showing the problem where we call a function called `getNameById`
and this function do some heavy computation or finding an item in an array
this operation happens multiple times in each render as shown below.

```
import  React  from  "react";

let myExampleComponent = () => {
	let  someDataArray  = [
		{  id:  1 , name: 'john' },
		{  id:  2 , name: 'doe' },
		{  id:  3 , name: 'fred' }
	];

	const getNameById = (id) => {
		let result = someDataArray.find(person => person.id === id);
		return result.name;
	};

	return (
		<div>
			<ul>
				{
					someDataArray.map((person) => (
						// Notice here we call the function
						// imagine every render we need to go find the same person
						// imagine that was a bigger array it would be really bad
						<li>{getNameById(person.id)}</li>
					))
				}
				<li>{getNameById()}</li>
			</ul>
		</div>
	);

};
```

### How we solved the issue

So, the solution is just to cache the values since this is a pure function and it does not do
any side effects we can cache it's arguments and its returning values using the hook in this library
as shown in the code below

```
import  React  from  "react";
import  { useMemoize } from "react-memoize-hook";

let myExampleComponent = () => {
	let  someDataArray  = [
		{  id:  1 , name: 'john' },
		{  id:  2 , name: 'doe' },
		{  id:  3 , name: 'fred' }
	];

	# Now notice here we the used the custom hook we made useMemoize
	# which will return you a new function that caches your values
	# with the arguments and only refresh the cache if anything in
	# the depencies array changes

	const getNameById = useMemoize((id) => {
		let result = someDataArray.find(person => person.id === id);
		return result.name;
	},[someDataArray]);

	return (
		<div>
			<ul>
				{
					someDataArray.map((person) => (
						// Now if you run the example
						// the getNameById function will not be called
						// twice for the same id
						<li>{getNameById(person.id)}</li>
					))
				}
				<li>{getNameById()}</li>
			</ul>
		</div>
	);

};
```

### Please raise an issue [here](<[https://github.com/abdoolly/react-memoize-hook/issues](https://github.com/abdoolly/react-memoize-hook/issues)>) if there are any bugs.
