<template>
    <v-main>
       <v-card elevation="3" class="mt-5 mx-6" style="border-radius: 6px;">
            <v-row justify="center" align="center" style="margin:3px auto;">
                <!-- <v-col>
                    <v-text-field v-model="search" class="font-weight-bold" color="black" style="width: 70%;font-family: Poppins; font-size: 20px; font-style:bold; border-radius: 10px;" rounded append-icon="mdi-magnify" outlined placeholder="Search..." hide-details></v-text-field>
                </v-col> -->
                <v-col>
                    <v-btn class="font-weight-bold" style="margin:10px auto;font-family: Poppins; font-size: 20px; text-transform: capitalize; float:right; color: #ffff" large color="#495057" @click="dialog = true">Add Hotel</v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-card elevation="3" style="border-radius: 6px;" class="mt-5 mx-6">
            <v-data-table :headers="headers" 
            :items="kota" :search="search" 
            :items-per-page="10">
                <template v-slot:[`item.actions`]="{ item }">
                    <!-- <v-btn color="green" class="mr-2" @click="editData(item)">Edit</v-btn>
                    <v-btn color="red" @click="selectedId = item.id; dialogConfirm = true">Delete</v-btn> -->
                    <v-icon  color="green darken-2" class="mr-2" @click="editData(item)">mdi-pencil</v-icon>
                    <v-icon  color="red" @click="selectedId = item.id; dialogConfirm = true"> mdi-delete </v-icon>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialog" style="border-radius: 10px;">
            <v-card style="border-radius: 10px;">
                <v-card-title class="pa-0">
                    <v-toolbar color="#ff8600" elevation="0" style="border-radius: 10px 10px 0px 0px;" height="90%">
                      <span style="color: #ffff; font-family: Poppins; font-weight: 800; font-size: 160%; margin-left: 3%;">{{ formTitle }}</span>   
                    </v-toolbar>
                </v-card-title> 
                <v-card-text class="pb-0">
                    <v-container> 
                        <v-form ref="form">
                            <v-text-field outlined color="black" class="textfield mt-3"  v-model="kotas.nama_kota" label="Nama Kota" required :rules="inputRules"></v-text-field>
                            <v-text-field outlined color="black" class="textfield mt-3"  v-model="kotas.provinsi" label="Provinsi" required :rules="inputRules"></v-text-field>                        
                        </v-form>
                    </v-container> 
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-end">
                    <v-btn color="#EEEEEE" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 900; color:#001D38;" @click="closeDialog()"> Cancel </v-btn>
                    <v-btn color="#ff8600" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 700; color:#ffff;" @click="save()"> Save </v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-dialog transition="dialog-top-transition" max-width="400" v-model="dialogConfirm" style="border-radius: 10px;">
            <v-card style="border-radius: 10px;">
                <v-card-title class="pa-0">
                    <v-toolbar color="#EF5350" elevation="0" style="border-radius: 10px 10px 0px 0px;" height="80%">
                      <span style="color: white; font-family: Poppins; font-weight: 800; font-size: 160%; margin-left: 3%;">Alert!</span>   
                    </v-toolbar>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="font-family: Poppins; font-size: 100%; color: #001D38; margin-top: 5%"> Are you sure want to delete this data? </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#EEEEEE" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 900; color:#001D38;" @click="dialogConfirm = false;"> Cancel </v-btn>
                    <v-btn color="#EF5350" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 700; color:#EEEEEE;" @click="deleteData()">Yes</v-btn> 
                </v-card-actions>
                </v-card>
        </v-dialog>
        <!-- <V-snackbar v-model="snackbar"  style="font-family: Poppins;" :color="color" timeout="2000" top>{{ error_message }}</v-snackbar>  -->
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
import { onMounted, ref, reactive } from 'vue'

export default {
    data(){
        return{
            dialog: false,
            dialogConfirm:false,
            idItem: '',
            headers: [
                {text: "Nama Kota", value: "nama_kota"},
                {text: "Provinsi", value: "provinsi"},
                {text: "Actions", value: "actions"},
            ],
            formType: 0,
            form: {
                nama_kota: '',
                provinsi: '',
            },
            inputRules: [
                (v) => !!v || 'Must be Filled!'
            ]
        }
    },
    setup() {
        //reactive state
        let kota = ref([])

        axios.defaults.headers.common["Authorization"] =
            localStorage.getItem("token_type") + " " + localStorage.getItem("token");

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/kotas').then(response => {
                //assign state posts with response data
                kota.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        const kotas = reactive({
            nama_kota: '',
            provinsi: ''
        })

        const validation = ref([])

        function save(){
            if(this.formType == -1){
                let nama_kota = kotas.nama_kota
                let provinsi = kotas.provinsi

                axios.put('http://127.0.0.1:8000/api/kotas/' + this.selectedId, {
                    nama_kota: nama_kota,
                    provinsi: provinsi
                }).then(()=>{
                    this.$router.push({
                        name: 'kotaPage'
                    })
                    this.closeDialog()
                    window.location.reload()
                }).catch(error=>{
                    this.validation.value = error.response.data
                    console.log(error);
                    console.log("ERROR:: ", error.response.data)
                })
            }else{
                let nama_kota = kotas.nama_kota
                let provinsi = kotas.provinsi

                axios.post('http://127.0.0.1:8000/api/kotas', {
                    nama_kota: nama_kota,
                    provinsi: provinsi
                }).then(()=>{
                    this.$router.push({
                        name: 'kotaPage'
                    })
                    this.closeDialog()
                    window.location.reload()
                }).catch(error=>{
                    this.validation.value = error.response.data
                    console.log(error);
                    console.log("ERROR:: ", error.response.data)
                })    
            }
        }

        function editData(item){
            this.dialog = true; 
            this.formType = -1; 
            this.form = Object.assign({}, item);
            this.selectedId = item.id;
            kotas.nama_kota = item.nama_kota,
            kotas.provinsi = item.provinsi
        }

        function deleteData(){
            axios.delete('http://127.0.0.1:8000/api/kotas/' + this.selectedId, {
                }).then(()=>{
                    this.$router.push({
                        name: 'kotaPage'
                    })
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
            kota,
            kotas,
            validation,
            save,
            editData,
            deleteData
        }
    },
    methods:{
        closeDialog() {
            this.dialog = false;
            this.formType = 0;
            this.$refs.form.reset();
        },
    },
    computed: {
        formTitle() {
            return this.formType === 0 ? "Add Kota" : "Update Kota";
        },
    },
}

</script>
