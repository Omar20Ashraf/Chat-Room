<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Chat</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <style>
        .list-group{
            overflow-y: scroll;
            height: 200px;

        }
        .typing{
            margin-right: 20px;
            font-size: 14px;
        }
        .log{
            margin-top: 10px;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <a href='{{url('/logout')}}' class="log float-right btn btn-primary " >Log Out</a>
    <div class="container">
        <div class="row" id="app">
            <div class="offset-4 col-4 offst-sm-1 col-sm-6">

                <li class="list-group-item active">Chat Room
                    <span class="badge badge-pill badge-danger">
                        @{{numberOfUsers}}
                    </span>

                </li>
                <ul class="list-group" v-chat-scroll>
                    <message
                    v-for="message,index in chat.messages"
                    :key="message.index"
                    :color=chat.color[index]
                    :user = chat.user[index]
                    :time = chat.time[index]
                    >

                        @{{message}}
                    </message>
                </ul>
                <div class="typing badge badge-pill badge-primary float-right">@{{typing}}</div>
                <input type="text" class="form-control" placeholder="type your message" v-model="message" @keyup.enter='send'>
                <br>
                <a href='' class="btn btn-danger btn-sm" @click.prevent='deleteSession'>Delete Messages</a>
            </div>

        </div>
    </div>

<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
