<template>
    <v-main>
      <v-card class="profileCard" elevation="5">
        <!-- <v-alert outlined color="#3C2317"> -->
        <v-card-title class="cardtitle"> Profile</v-card-title>
          <v-img 
            width="150" 
            justify-center
            max-height="140"
            lazy-src="https://picsum.photos/id/11/10/6"
            src="https://static.vecteezy.com/system/resources/thumbnails/008/302/417/small_2x/eps10-brown-user-solid-icon-or-logo-in-simple-flat-trendy-modern-style-isolated-on-white-background-free-vector.jpg"
          ></v-img>

          <v-divider class="mx-4"></v-divider>
          <v-text-field v-model="user.username" label="Username" disabled></v-text-field>
          <v-text-field v-model="user.email" label="Email" disabled></v-text-field>
          <v-text-field v-model="user.noTelp" label="Nomor Telepon" disabled></v-text-field>

          <v-card-actions>
            <v-btn color="#219ebc" style="font-family: Poppins; font-size: 20px; font-weight: 700; color:#ffff;" @click="editData()">Edit</v-btn>
          </v-card-actions>            

      </v-card>
      
      <v-dialog v-model="dialog"  persistent max-width="600px"
      max-height="170" class="mb-5" >
      <v-card color="brown lighten-5">
        <v-card-title>Edit Profile</v-card-title>
        <v-card-text>
          <v-text-field v-model="users.username" label="Username" required :rules="inputRules"></v-text-field>
          <v-text-field v-model="users.noTelp" label="Nomor Telepon" required :rules="inputRules"></v-text-field>
          
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="brown lighten-1" class="mr-5" @click="dialog = false">Cancel</v-btn>
          <v-btn color="green" @click="save()"> Save </v-btn>
        </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
    </v-main>
  </template>

<style>
  .profileCard{
    margin: 25px;
    padding: 5px;
    width: 500px;

  }
  .cardtitle{
    font-size: xx-large;
    float: center;
  }

</style>

<script>

import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'

export default {
    data(){
        return{
            dialog: false,
            form: {
              username: '',
              noTelp:'',
            },
            inputRules: [
                (v) => !!v || 'Must be Filled!'
            ]
        }
    },
    setup() {
        //reactive state
        let user = ref([])

        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/users/' + localStorage.getItem("id_user")).then(response => {
                //assign state posts with response data
                user.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })        

        axios.defaults.headers.common["Authorization"] =
            localStorage.getItem("token_type") + " " + localStorage.getItem("token");

        const users = reactive({
            username: '',
            noTelp:'',
        })

        const validation = ref([])

        function save(){
            
                let username = users.username
                let noTelp = users.noTelp

                axios.put('http://127.0.0.1:8000/api/kotas/' + localStorage.getItem("id_user"), {
                    username: username,
                    noTelp: noTelp,
                }).then(()=>{
                    this.dialog = false
                    window.location.reload()
                }).catch(error=>{
                    this.validation.value = error.response.data
                    console.log(error);
                    console.log("ERROR:: ", error.response.data)
                })
        }

        function editData(){
            this.dialog = true;
            users.username = this.user.username
            users.noTelp = this.user.noTelp
        }
        //return
        return {
            user,
            users,
            validation,
            save,
            editData
        }
    },
  }

</script>

<!-- <script>

import axios from 'axios'

export default {
  name: "profilePage",
  data() {
    return {
      inputType:"Ubah",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialogConfirm: false,
      showPreview: false,
      user: new FormData(),
      users : [],
      formUser:{
        name:null,
        email:null,
        noTelp:null,
      },
      editId: "",
      deleteId: "",
    };
  },
  methods: {
    setProfile(){
      if(this.inputType !== 'Ubah'){
      this.update();
    }
    else{
      this.save();
    }
    },

    readData() {       
      // this.$http.get(this.$api + '/users',{
      //   headers: {
      //       'Authorization': 'Bearer ' + localStorage.getItem('token'),
      //     },
      // }).then(response => {
      //   this.user = response.data.data;
      // }).catch(error => {
      //   console.log(error)
      // })  

      axios.get('http://127.0.0.1:8000/api/users' + localStorage.getItem('id_user')).then(response => {
              //assign state posts with response data
              this.user = response.data.data
          }).catch(error => {
              console.log(error.response.data)
          })
    },

    editItem(item){
      this.inputType = 'Ubah';
      this.editId = item.id;
      this.formUser.username = item.username;
      this.formUser.email = item.email;
      this.formUser.noTelp = item.noTelp;
      this.dialog = true;
    },

    update() {
      let newData = {
        username : this.user.username,
        email : this.user.email,
        noTelp : this.user.noTelp
      };
      var url = this.$api + '/users/' + this.editId;
      this.load = true;
      this.$http.put(url, newData, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.error_message = response.data.message;
        this.color = 'green';
        this.snackbar = true;
        this.load = false;
        this.readData();
        this.resetForm();
        this.inputType = 'Ubah';
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = 'red';
        this.snackbar = true;
        this.load = false;
      });          
    },
    close() {
    this.dialog = false;
    this.inputType = "Ubah";
    this.dialogConfirm = false;
    this.readData();
  },
  cancel() {
    this.resetForm();
    this.readData();
    this.dialog = false;
    this.dialogConfirm = false;
    this.inputType = "Ubah";
  },
  resetForm() {
    this.form = {
      username: null,
      email: null,
      noTelp: null,
    };
  },
  },
  computed: {
  formTitle() {
    return this.inputType;
  },
},
  mounted() {
    this.readData();
  },
};
</script>  -->