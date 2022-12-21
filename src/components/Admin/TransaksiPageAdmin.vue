<template>
    <v-main>
       <v-card elevation="3" class="mt-5 mx-6" style="border-radius: 6px;">
            <v-row justify="center" align="center" style="margin:3px auto;">
            </v-row>
        </v-card>
        <v-card elevation="3" style="border-radius: 6px;" class="mt-5 mx-6">
            <v-data-table :headers="headers" 
            :items="transaksi"
            :items-per-page="10">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon  color="red" @click="selectedId = item.id; dialogConfirm = true"> mdi-delete </v-icon>
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
import { onMounted, ref } from 'vue'

export default {
    data(){
        return{
            dialogConfirm:false,
            idItem: '',
            headers: [
                {text: "Kota Asal", value: "kota_asal"},
                {text: "Kota Tujuan", value: "kota_tujuan"},
                {text: "Nama Hotel", value:"nama_hotel"},
                {text: "Nama Maskapai", value:"nama_maskapai"},
                {text: "Nama User", value:"username"},
                {text: "Harga", value:"harga"},
                {text: "Actions", value: "actions"},
            ],
            inputRules: [
                (v) => !!v || 'Must be Filled!'
            ],

        }
    },
    setup() {
        //reactive state
        let transaksi = ref([])

        axios.defaults.headers.common["Authorization"] =
            localStorage.getItem("token_type") + " " + localStorage.getItem("token");

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/transaksis').then(response => {
                //assign state posts with response data
                transaksi.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function deleteData(){
            axios.delete('http://127.0.0.1:8000/api/transaksis/' + this.selectedId, {
                }).then(()=>{
                    this.$router.push({
                        name: 'transaksiPageAdmin'
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
            transaksi,
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
}

</script>
