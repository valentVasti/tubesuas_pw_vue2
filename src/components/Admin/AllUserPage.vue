<template>
    <v-main>
       <v-card elevation="3" class="mt-5 mx-6" style="border-radius: 6px;">
            <v-row justify="center" align="center" style="margin:3px auto;">
            </v-row>
        </v-card>
        <v-card elevation="3" style="border-radius: 6px;" class="mt-5 mx-6">
            <v-data-table :headers="headers" 
            :items="user"
            :items-per-page="10">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon  color="red" @click="selectedId = item.id; checkAdmin(item.username)"> mdi-delete </v-icon>
                </template>
            </v-data-table>
        </v-card>
        
        <v-dialog transition="dialog-top-transition" max-width="400" v-model="dialogConfirm" style="border-radius: 10px;">
            <v-card style="border-radius: 10px;">
                <v-card-title class="pa-0">
                    <v-toolbar color="#EF5350" elevation="0" style="border-radius: 10px 10px 0px 0px;" height="80%">
                      <span style="color: white; font-family: Poppins; font-weight: 800; font-size: 160%; margin-left: 3%;">Alert!</span>   
                    </v-toolbar>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="font-family: Poppins; font-size: 100%; color: #001D38; margin-top: 5%"> Are you sure want to delete this User? </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#EEEEEE" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 900; color:#001D38;" @click="dialogConfirm = false;"> Cancel </v-btn>
                    <v-btn color="#EF5350" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 700; color:#EEEEEE;" @click="deleteData()">Yes</v-btn> 
                </v-card-actions>
                </v-card>
        </v-dialog>

        <v-dialog transition="dialog-top-transition" max-width="400" v-model="dialogCheck" style="border-radius: 10px;">
            <v-card style="border-radius: 10px;">
                <v-card-title class="pa-0">
                    <v-toolbar color="#EF5350" elevation="0" style="border-radius: 10px 10px 0px 0px;" height="80%">
                      <span style="color: white; font-family: Poppins; font-weight: 800; font-size: 160%; margin-left: 3%;">Alert!</span>   
                    </v-toolbar>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="font-family: Poppins; font-size: 100%; color: #001D38; margin-top: 5%"> Can't Remove Admin Account! </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#EEEEEE" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 900; color:#001D38;" @click="dialogCheck = false;"> OK </v-btn>
                </v-card-actions>
                </v-card>
        </v-dialog>
    </v-main>
</template>

<style lang="css">
    @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap');

    thead tr th span {
        font-size: 160% !important;
        font-family: Poppins !important;
        letter-spacing: 2%;
        font-weight: 600;
        color: black !important;
    }

    tbody tr td{
        font-size: 100% !important;
        font-family: Poppins !important;
        letter-spacing: 2%;
        font-weight: 100;
        color: black !important;
    }

    .textfield{
        font-family: Poppins !important;
        color: black;
    }

    .v-list-item__title{
        font-family: Poppins !important;
        color: black;
    }

</style>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
    data(){
        return{
            dialogConfirm: false,
            dialogCheck: false,
            headers: [
                {text: "ID User", value: "id"},
                {text: "Username", value: "username"},
                {text: "Email", value: "email"},
                {text: "No Telepon", value: "noTelp"},
                {text: "Verified", value: "email_verified_at"},
                {text: "", value: "actions"},

                
            ],
            inputRules: [
                (v) => !!v || 'Must be Filled!'
            ],
        }
    },
    setup() {
        //reactive state
        let user = ref([])

        axios.defaults.headers.common["Authorization"] =
            localStorage.getItem("token_type") + " " + localStorage.getItem("token");

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/users').then(response => {
                //assign state posts with response data
                user.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function deleteData(){
            axios.delete('http://127.0.0.1:8000/api/users/' + this.selectedId, {
                }).then(()=>{
                    this.dialogConfirm=false
                    window.location.reload()
                }).catch(error=>{
                    this.validation.value = error.response.data
                    console.log(error);
                    console.log("ERROR:: ", error.response.data)
                })
        }
        //return
        return {
            user,
            deleteData
        }
    },
    created: {

    },
    methods:{
        closeDialog() {
            this.dialog = false;
            this.formType = 0;
            this.$refs.form.reset();
        },
        checkAdmin($username){
            if($username == 'admin'){
                this.dialogConfirm = false
                this.dialogCheck = true
            }else{
                this.dialogConfirm = true
            }
        }
    },
    computed: {
        formTitle() {
            return this.formType === 0 ? "Add Hotel" : "Update Hotel";
        },
    },
}

</script>

