var tableComponent = Vue.component(
    'x-table',
    {
        props: ['table'],
        template:
            `<div class="table-container">
                        <div v-if="!table.done" >
                            <center><br><h4>Occupied by {{table.num}}</h4>
                            <h4>(free in: {{parseInt(table.time/60)}}:{{table.time%60}})</h4>
                            <button v-on:click="evict(table.msg)" >Evict</button></center>
                        </div>
                        <div v-else>
                            <center><br><br><h4>Table Available</h4>
                            <h4>(Capacity={{table.capacity}})</h4></center>
                        </div>
                    </div>
                    `,
        methods:{
            evict: function(val){

                alert(val);
                app.evict(this.table.id);
            },
            untilAvailable:async function()
            {
                return new Promise(resolve => {

                    if(this.table.done)
                    {
                        resolve(true);
                    }
                    else{
                        resolve(false);
                    }

                });
            }
        }
    }
);
