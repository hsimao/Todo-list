
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
            deadline: '2018/06/10 19:00:00',
            completed: false,
            important: false
        }],
        newTodoTitle: '',
        newTodoDay: '',
        newTodoTime: '',
        show: 'all',
        cacheTodo: {},
        cacheTitle: '',
        add: false,
        edit: false,
        error: false,
        errorText: ''
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
            if (!this.newTodoTitle.trim()) {
                this.error = true
                this.errorText = '尚未輸入文字'
                return
            }
            if (!this.newTodoDay) {
                this.error = true
                this.errorText = '請輸入完整時間'
                return
            }
            if (!this.newTodoTime) this.newTodoTime = '00:00:00'
            newDeadline = new Date(`${this.newTodoDay} ${this.newTodoTime}`).getTime()

            this.todos.push({
                id: uuidv4(),
                title: this.newTodoTitle,
                createTime: new Date().getTime(),
                deadline: newDeadline,
                completed: false,
                important: false
            })
            this.saveTodoInLocal()
            this.cancelAdd()
        },
        saveTodoInLocal() {
            localStorage.setItem('todos', JSON.stringify(this.todos))
        },
        cancelAdd() {
            this.newTodoTitle = ''
            this.newTodoTime = ''
            this.newTodoDay = ''
            this.add = false
        },
        format(timestamp) {
            const time = new Date(timestamp)
            let s = time.getSeconds()
            let m = time.getMinutes()
            let h = time.getHours()
            let d = time.getDate()
            let M = time.getMonth()+1
            let Y = time.getFullYear()
            return `${Y}/${M}/${d} ${h}:${m}:${s}`
        },
        fileChange(value) {
            let fileName = value.files[0].name
            value.previousElementSibling.innerText = fileName
        }
    },
    computed: {


    },
    created(){
        this.todos = this.getSavedTodos()
    }
})