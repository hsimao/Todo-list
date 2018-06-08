
function fileChange(value){
    let fileName = value.files[0].name
    value.previousElementSibling.innerText = fileName
    console.log(value.previousElementSibling)
    console.log(fileName)
}

document.addEventListener('click', function(e){
    // console.log('clientY ', e.clientY)
    // console.log('clientX ',e.clientX)
})
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
        newTitle: '',
        newDeadline: '2018-10-10',
        show: 'all',
        cacheTodo: {},
        cacheTitle: '',
        cacheDeadline: '',
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
        addShow() {
            this.add = !this.add
            if (this.add) this.edit = false
        },
        addTodo() {
            if (!this.newTitle.trim()) {
                this.error = true
                this.errorText = '尚未輸入文字'
                return
            }
            if (!this.newDeadline) {
                this.error = true
                this.errorText = '請輸入完整時間'
                return
            }
            this.todos.push({
                id: uuidv4(),
                title: this.newTitle,
                createTime: new Date().getTime(),
                deadline: this.newDeadline,
                completed: false,
                important: false,
                isBlur: false
            })
            this.saveTodoInLocal()
            this.cancelAdd()
        },
        saveTodoInLocal() {
            localStorage.setItem('todos', JSON.stringify(this.todos))
        },
        cancelAdd() {
            this.newTitle = ''
            this.newDeadline = ''
            this.add = false
        },
        Edit(item) {
            this.edit = !this.edit
            this.add = false
            this.cacheTodo = item
            this.cacheTitle = item.title
            this.cacheDeadline = item.deadline
        },
        cancelEdit() {
            this.cacheTodo = {}
        },
        saveEdit(item) {
            item.title = this.cacheTitle
            item.deadline = this.cacheDeadline
            this.saveTodoInLocal()
            this.cacheTodo = {}
            this.edit = !this.edit
        },
        update(type, id) {
            this.todos.forEach((item)=>{
                if (item.id === id) {
                    item[type] = !item[type]
                }
            })
            this.saveTodoInLocal()
        },
        removeTodo(id){
            let target = null
            this.todos.forEach((item, index)=>{
                if (item.id === id) target = index
            })
            this.todos.splice(target, 1)
            this.edit = !this.edit
        },
        format(timestamp) {
            const time = new Date(timestamp)
            let d = time.getDate()
            let M = time.getMonth()+1
            let Y = time.getFullYear()
            return `${Y}-${M}-${d}`
        },
        fileChange(value) {
            let fileName = value.files[0].name
            value.previousElementSibling.innerText = fileName
        }
    },
    computed: {
        activeCount: function() {
            let count = 0
            this.todos.forEach((item)=>{
                if (!item.completed) count++
            })
            return count
        },
        filterTodo() {
            let newTodos = []
            if (this.show === 'all') newTodos = this.todos
            if (this.show === 'active') {
                this.todos.forEach((item)=>{
                    if (!item.completed) newTodos.push(item)
                })
            }
            if (this.show === 'completed') {
                this.todos.forEach((item)=>{
                    if (item.completed) newTodos.push(item)
                })
            }

            // 時間排序
            newTodos.sort((a, b)=>{
                if (a.createTime > b.createTime) {
                    return -1
                } else if (a.createTime < b.createTime) {
                    return 1
                } else {
                    return 0
                }
            })
            // 標記為重要的向上排列
            return newTodos.sort((a, b)=>{
                if (a.important) {
                    return -1
                } else{
                    return 1
                }
            })
        }
    },
    created(){
        this.todos = this.getSavedTodos()
    }
})