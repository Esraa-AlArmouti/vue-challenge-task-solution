var restaurantComponent = Vue.component(
    'x-restaurant',
    {
        props: ['tables'],
        template:
            `<div class="restaurant-container">
                <x-table v-for="item in tables" v-bind:table="item" v-bind:key="item.id" />
            </div>`,
        components: {
            'x-table':tableComponent
        },
        methods:{
            awaitTable: async function(size) {
                return new Promise(resolve => {
                    let index = this.getIndex(size);
                    if(index != null) {
                        resolve(index);
                    }
                    else
                    {
                        let timer = setInterval(() => {
                            index = this.getIndex();

                            if(index != null) {
                                clearInterval(timer);
                                resolve(index);
                            }
                        }, 1000);
                    }
                });
            },
            getIndex: function(size) {
                let index = null;
                let tmp;
                let lowest = Number.POSITIVE_INFINITY;

                for(let i = 0; i < app.Tables.length; i ++) {
                    if(app.Tables[i].done === true && app.Tables[i].capacity >= size) {
                        tmp = app.Tables[i].capacity;

                        if(tmp < lowest) {
                            lowest = tmp;
                            index = i;
                        }
                    }
                }

                return index;
            }
        }
    }
);

