import React, { createContext } from 'react';

//CONTEXT
const MyContext = createContext({
    id: '',
    updateID: () => {},
})

//PROVIDER
//Parent component that will manage the shared state
class MyProvider extends React.Component {
    updateID = newID => {
        this.setState({ id: newID });
    };

    state = {
        id: '',
        updateID: this.updateID,
    };

    render() {
        return (
            <MyContext.Provider value={this.state}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

//CONSUMER
//All component to access the shared state
const MyConsumer = MyContext.Consumer;

export { MyProvider, MyConsumer }