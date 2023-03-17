# Questions and Answers

- **Difference between Component and Pure Component**: The main difference is that PureComponent will skip re-render if props are the same. Probably its the same effect as using React.memo on Functional Components. To be honest I havent used them(Class Components) lately at all. There could be other differences

- **Context + ShouldComponentUpdate might be dangerous. Can think of why is that**: Unfortunately I do not know, like I said I havent been using Class Components for past 3 years I think. I could search this on google but that defeats the purpose

- **Describe 3 ways to pass information from a component to its PARENT**: First and most basic use case is to use props to pass the data from parent to the child. If we want to avoid prop drilling we can use React Context, which is second way of passing the data. Third way that I could think of is top level state of the APP, and for that we can use various things like Redux, Zustand, Joitai, React Query etc

- **Give 2 ways to prevent components from re-rendering.**: Components can be prevented from rerendering by wrapping them inside React.memo or by using React.useMemo and React.useCallback on the parent side to memoize props which are passed to the children

- **What is a fragment and why do we need it? Give an example where it might break my app**: React.Fragment is used when we want to avoid div soup for example, that way we do not have to wrap 2 or more direct children inside a common parent. By wrapping them inside React.Fragment we effectively achived the same result. In general we can avoid necessary DOM elements. I am not aware of how it can break the APP though


- **Give 3 examples of the HOC pattern.**: Not much I can say about this. The examples I could think of are, UI transformation and passing props/state which is common.

- **what's the difference in handling exceptions in promises, callbacks and async...await.**: To handle exceptions inside promises we have to use either .catch method or to specify second parameter on the then() method. Inside callbacks we have to provide a function which will be invoked in case of error. Async await is neat because we can wrap it inside try/catch clause, its most intuitive.

- **How many arguments does setState take and why is it async.**: setState accepts one argument, which is either the next state or a function that will be used in order to compute the next state. setState is async because updating the state can not block other events which are already queued up from occuring. Also because its async different techniques can be used to optimize it, like state batching etc

- **List the steps needed to migrate a Class to Function Component.**: On top of my head... Replace class with function of course. Any constructor state initialization must be replaced with useState hooks, render method should be transformed into return statement. This binding can not be used at all.


- **List a few ways styles can be used with components.**: First and worst would be to use inline styles. Then we could use CSS modules like I used for this task. Also there are various JSS solutions like Styled components, Emotion. My personal favourite is Tailwind/Twind.

- **How to render an HTML string coming from the server.**: This is a bad practice but if it needs to be done, dangerouslySetInnerHTML can be used.
