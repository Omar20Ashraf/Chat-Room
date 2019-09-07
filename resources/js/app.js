
require('./bootstrap');

window.Vue = require('vue');

//for the auto scroll
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

//for the notification
import Toaster from 'v-toaster'

Vue.use(Toaster, {timeout: 5000})

import 'v-toaster/dist/v-toaster.css'

Vue.component('message', require('./components/Message.vue').default);



const app = new Vue({
    el: '#app',
    data:{
        message:'',
        chat:{
            messages:[],
            user:[],
            color:[],
            time:[],
        },
        typing:'',
        numberOfUsers:0,
    },
    watch:{
        message(){
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                });
        }
    },
    methods:{
        send(){
            if(this.message.length != 0){
                this.chat.messages.push(this.message);
                this.chat.user.push('you');
                this.chat.color.push('success');
                this.chat.time.push(this.getTime());
                axios.post('/send', {
                    message : this.message,
                    chat:this.chat
                  })
                  .then(response => {
                    // console.log(response);
                    this.message = ''
                  })
                  .catch(error => {
                    console.log(error);
                  });
            }
        },
        getTime(){
            let time = new Date();
            return time.getHours()+':'+time.getMinutes();
        },
        getOldMessages(){
            axios.post('/getOldMessage')
                  .then(response => {
                    console.log(response);

                    if (response.data != '') {
                        this.chat = response.data;
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
        },
        deleteSession(){
            axios.post('/deleteSession')
            .then(response=> {
                this.chat.messages = ''
                this.$toaster.success('Chat history is deleted');
                window.location.reload();

            })
        }
    },
    mounted(){
        this.getOldMessages();
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.messages.push(e.message);
                this.chat.user.push(e.user);
                this.chat.color.push('warning');
                this.chat.time.push(this.getTime());

                axios.post('/saveToSession',{
                    chat : this.chat
                })
                      .then(response => {
                      })
                      .catch(error => {
                        console.log(error);
                      });


            })
            .listenForWhisper('typing', (e) => {
                if(e.name != ''){
                    this.typing = 'typing....'
                } else {
                    this.typing = ''
                }
            })

        Echo.join('chat')
            .here((users) => {
                this.numberOfUsers = users.length;
            })
            .joining((user) => {
                this.numberOfUsers += 1;
                this.$toaster.success(user.name+' Joined the chat');
            })
            .leaving((user) => {
                this.numberOfUsers -= 1;
                this.$toaster.warning(user.name+' leaved the chat');
            });
    }
});
