
function fileChange(value){
    let fileName = value.files[0].name
    value.previousElementSibling.innerText = fileName
    console.log(value.previousElementSibling)
    console.log(fileName)
}

var app = new Vue({
    el: '#app',
    data: {
        todos: [{
            id: '123456',
            title: '超商取貨',
            createTime: '2018/06/06 19:00:00',
            completed: false,
            important: false
        }],
        newTodo: '',
        show: 'all',
        cacheTodo: {},
        cacheTitle: '',
        add: false,
        edit: false
    },
    methods: {
        getSavedTodos() {
            const todosJSON = localStorage.getItem('todos')
            try {
                return todosJSON ? JSON.parse(todosJSON) : []
            } catch (e) {
                return []
            }
        },

        addTodo() {
            if (!this.newTodo.trim()) return
            console.log(this.newTodo)
            this.todos.push({
                id: uuidv4(),
                title: this.newTodo,
                createTime: new Date().getTime(),
                completed: false,
                important: false
            })
            this.newTodo = ''
            this.saveTodoInLocal()
        },
        saveTodoInLocal() {
            localStorage.setItem('todos', JSON.stringify(this.todos))
        }


    },
    computed: {

    },
    created(){
        this.todos = this.getSavedTodos()
    }
})