let app = new Vue(
    {
        el: '#app',
        data: {
            Tables: [
                { id: 0, num: 0, time: '00:00', done: true, capacity: 10, msg:""},
                { id: 1, num: 0, time: '00:00', done: true, capacity: 8, msg:""},
                { id: 2, num: 0, time: '00:00', done: true, capacity: 10, msg:""},
                { id: 3, num: 0, time: '00:00', done: true, capacity: 6, msg:""},
                { id: 4, num: 0, time: '00:00', done: true, capacity: 2 , msg:""},
                { id: 5, num: 0, time: '00:00', done: true, capacity: 6 , msg:""},
                { id: 6, num: 0, time: '00:00', done: true, capacity: 4 , msg:""},
                { id: 7, num: 0, time: '00:00', done: true, capacity: 12 , msg:""}
            ],
            num_people: null,
            duration_statu: null,
            message: null,
        },
        mounted:function() {
            this.Tables.forEach(element => {
                element.done = true;
                element.time = 0;
            });

            setInterval(() => {
                for(let i = 0; i < this.Tables.length; i ++) {
                    if(!this.Tables[i].done && this.Tables[i].time > 0) {

                        this.Tables[i].time --;

                        if(this.Tables[i].time === 0)
                            this.Tables[i].done = true;
                    }
                    else {
                        this.Tables[i].done = true;
                    }
                }
                localStorage.setItem('currentState', JSON.stringify(this.Tables));
            }, 1000);

            if(localStorage.getItem("currentState") !== null) {
                this.Tables = JSON.parse(localStorage.getItem("currentState"));
            }
        },
        methods: {
            save: async function(key) {

                restaurantComp =  app.$refs.restaurant;
                let table = await restaurantComp.awaitTable(this.num_people); // 3

                if(table !== null)
                {
                    let index = table;
                    table = restaurantComp.$children[index]; // return vue component - x-table

                    let isAvailable = await table.untilAvailable();
                    if(isAvailable)
                    {
                        app.Tables[index].num=this.num_people;
                        app.Tables[index].time=this.duration_statu;
                        app.Tables[index].msg=this.message;
                        app.Tables[index].done=false;
                    }
                }

            },
            evict: function(index) {
                this.Tables[index].num = 0;
                this.Tables[index].time = 0;
                this.Tables[index].msg = '';
                this.Tables[index].done = true;
            }
        },
        components:{
            'x-resturant':restaurantComponent
        },
    });
