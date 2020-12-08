import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableComponent from "./components/Table";
import FormComponent from "./components/Form";

class App extends React.Component {

    state = {
        todos: [],
        todosInLocalStorage: [],
        currentName: "",
        currentEmail: "",
        currentPassword: "",
        currentPhoneNumber: "",
        currentStatus: "",
        id: null,
        searchValue: "",
        searchValueStatus: "",
        isValid: false,
    }

    //Метод, меняющий значение isValid в зависимости от условия
    setIsValid = (value) => {
        const {currentName, currentEmail, currentPassword, currentPhoneNumber} = this.state

        if( value === "currentEmail" && !currentEmail.length){
            return this.setState({isValid: false})
        }
        if(value === "currentName" && !currentName.length){
            return this.setState({isValid: false})
        }
        if(value === "currentPassword" && !currentPassword.length){
            return this.setState({isValid: false})
        }
        if(value === "currentPhoneNumber" && !currentPhoneNumber.length){
            return this.setState({isValid: false})
        }
        if(currentEmail.length && currentName.length && currentPassword.length && currentPhoneNumber.length){
            return this.setState({isValid: true})
        }
    }

     componentDidMount () {
        let keys = Object.keys(localStorage);
        let mokTodos = []
        for(let key of keys) {
            mokTodos.push(JSON.parse(localStorage.getItem(key)))
        }

        this.setState({todos: mokTodos})
        this.setState({todosInLocalStorage: mokTodos})
    }

    //Метод, добавляющий в локальное состояние компонента введенные символы из поля ввода
    handleChange = (field, {target: {value}}) => {
        this.setState({[field] : value})
    }

    //Метод, добавляющий новую строку в таблицу. В результате создается поле с информацией строки в LocalStorage
    onSubmitDate = (...filed) => {
        const {currentName, currentEmail, currentPassword, todos, todosInLocalStorage, currentPhoneNumber, currentStatus} = this.state
        let {id} = this.state
        let number = Math.random()
        const obj = {
            name: currentName,
            email: currentEmail,
            password: currentPassword,
            phone: currentPhoneNumber,
            status: currentStatus,
            id: number,
        }
        this.setState(state => ({id: number}))
        this.setState({todos: todos.concat(obj)})
        filed.forEach(item => {
            this.setState({[item]: ""})
        })
        localStorage.setItem(`${id}`, JSON.stringify(obj) )
        this.setState({todosInLocalStorage: todosInLocalStorage.concat(JSON.parse( localStorage.getItem(`${id}`) ))})
        this.setState({isValid: false})
    }

    //Метод, удаляющий строку таблицы, после удаления строки очищается поле в LocalStorage
    deleteItem = (id) => {
        const {todos } = this.state
        const deleteItems =  localStorage.getItem(`null`)
        const newTodo = todos.filter( (item, index) => {
            return item.id !== id
        })
        this.setState({todos: newTodo})

        if(deleteItems){
            return localStorage.removeItem("null")
        }
        localStorage.removeItem(id)
    }

    //Метод поиска по полю name в таблице
    getSearchUser = ( {target: {value} }) => {
        const {todos, todosInLocalStorage } = this.state
        this.setState( state => ({searchValue: value}))
        if(value){
            const newTodoForName = [...todos].filter( (item) => !item.name.indexOf(value))
            return this.setState({todos: newTodoForName})
        }else{
            return this.setState({todos: todosInLocalStorage})
        }

    }

    //Метод поиска по полю status в таблице
    getSearchStatus = ( {target: {value} }) => {
        const {todos, todosInLocalStorage } = this.state
        this.setState({searchValueStatus: value})
        if(value === "partner" || value === "admin" || value === "client") {
            const newTodoForName = [...todos].filter( (item) => !item.status.indexOf(value))
            return this.setState({todos: newTodoForName})
        }else{
            return this.setState({todos: todosInLocalStorage})
        }
    }

    render() {

        const {
            currentName,
            currentEmail,
            currentPassword,
            todos,
            searchValue,
            currentPhoneNumber,
            searchValueStatus,
            currentStatus,
            isValid,
            } = this.state

        return (
            <div className="App">

                <FormComponent
                    currentEmail={currentEmail}
                    currentName={currentName}
                    currentPassword={currentPassword}
                    currentPhoneNumber={currentPhoneNumber}
                    searchValue={searchValue}
                    currentStatus={currentStatus}
                    searchValueStatus={searchValueStatus}
                    handleChange={this.handleChange}
                    getSearchUser={this.getSearchUser}
                    onSubmitDate={this.onSubmitDate}
                    getSearchStatus={this.getSearchStatus}
                    setIsValid={this.setIsValid}
                    isValid={isValid}
                />

                <TableComponent
                    todos={todos}
                    deleteItem={this.deleteItem}
                />
            </div>
        );
    }
}

export default App;
