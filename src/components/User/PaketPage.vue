<template>
    <v-main>
       <v-card elevation="3" class="mt-5 mx-6" style="border-radius: 6px;">
            <v-row justify="center" align="center" style="margin:3px auto;">
                <v-col>
                    <v-select :items="kota" item-text="nama_kota" item-value="id" v-model="transaksi.id_asal" outlined label="Kota Asal"></v-select>
                </v-col>
                <v-col>
                    <v-select :items="kota" item-text="nama_kota" item-value="id" v-model="transaksi.id_tujuan" outlined label="Kota Tujuan"></v-select>
                </v-col>
                <v-col>
                    <v-btn color="green" class="mr-2" @click="check(); showResult()">Check Hotel dan Penerbangan</v-btn>
                </v-col>
            </v-row>
        </v-card>

        <div v-show="table">
            <v-card elevation="3" style="border-radius: 6px;" class="mt-5 mx-6">
                <v-data-table :headers="headersHotel" 
                :items="hotel" :search="kotaAsal.nama_kota" 
                :items-per-page="10">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn color="green" class="mr-2" @click="getHotel(item.id); transaksi.id_hotel = item.id">Pilih</v-btn>
                    </template>
                </v-data-table>
            </v-card>

            <v-card elevation="3" style="border-radius: 6px;" class="mt-5 mx-6">
                <v-data-table :headers="headersPenerbangan" 
                :items="penerbangan" :search="kotaTujuan.nama_kota" 
                :items-per-page="10">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn color="green" class="mr-2" @click="getPenerbangan(item.id); transaksi.id_penerbangan = item.id">Pilih</v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </div>

        <v-card elevation="3" style="border-radius: 6px;" class="mt-5 mx-6">
            <v-card-title>Form Data</v-card-title>
                <v-container> 
                    <v-form ref="form">
                        <v-row justify="center" align="center" style="margin:3px auto;">
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="kotaAsal.nama_kota" label="Kota Asal" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="kotaTujuan.nama_kota" label="Kota Tujuan" disabled></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row></v-row>
                        <v-row justify="center" align="center" style="margin:3px auto;">
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="hotels.nama_hotel" label="Nama Hotel" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="hotels.bintang" label="Bintang" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="kotaTujuan.nama_kota" label="Lokasi Kota" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="hotels.harga" label="Harga" disabled></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row></v-row>
                        <v-row justify="center" align="center" style="margin:3px auto;">
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="penerbangans.nama_maskapai" label="Nama Maskapai" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="kotaAsal.nama_kota" label="Kota Asal" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="kotaTujuan.nama_kota" label="Kota Tujuan" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="penerbangans.kelas" label="Kelas" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="penerbangans.harga" label="Harga" disabled></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                           <v-btn class="font-weight-bold" style="margin:10px auto;font-family: Poppins; font-size: 20px; text-transform: capitalize; float:right; color: #ffff" large color="#495057" @click="dialog = true; transaksi.harga = hotels.harga + penerbangans.harga">Save</v-btn>
                        </v-row>
                    </v-form>
                </v-container> 
        </v-card>

        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialog" style="border-radius: 10px;">
            <v-card style="border-radius: 10px;">
                <v-card-title class="pa-0">
                    <v-toolbar color="#ff8600" elevation="0" style="border-radius: 10px 10px 0px 0px;" height="90%">
                      <span style="color: #ffff; font-family: Poppins; font-weight: 800; font-size: 160%; margin-left: 3%;">Note Pembayaran</span>   
                    </v-toolbar>
                </v-card-title> 
                <v-card-text class="pb-0">
                    <v-container> 
                        <v-form ref="form">
                        <v-row justify="center" align="center" style="margin:3px auto;">
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="kotaAsal.nama_kota" label="Kota Asal" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="kotaTujuan.nama_kota" label="Kota Tujuan" disabled></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row></v-row>
                        <v-row justify="center" align="center" style="margin:3px auto;">
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="hotels.nama_hotel" label="Nama Hotel" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="hotels.bintang" label="Bintang" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="kotaTujuan.nama_kota" label="Lokasi Kota" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="hotels.harga" label="Harga" disabled></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row></v-row>
                        <v-row justify="center" align="center" style="margin:3px auto;">
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="penerbangans.nama_maskapai" label="Nama Maskapai" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="kotaAsal.nama_kota" label="Kota Asal" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="kotaTujuan.nama_kota" label="Kota Tujuan" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="penerbangans.kelas" label="Kelas" disabled></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="penerbangans.harga" label="Harga" disabled></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <p>{{ user }}</p>
                            </v-col>
                            <v-col>
                                <v-text-field  color="black" class="textfield mt-3"  v-model="transaksi.harga" label="Total Harga" disabled></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                    </v-container> 
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-end">
                    <v-btn color="#EEEEEE" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 900; color:#001D38;" @click="dialog = false"> Cancel </v-btn>
                    <v-btn color="#ff8600" large style="font-family: Poppins; font-size: 20px; text-transform: capitalize; font-weight: 700; color:#ffff;" @click="save()"> Save </v-btn> 
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
            headersHotel: [
                {text: "Nama Hotel", value: "nama_hotel"},
                {text: "Bintang", value: "bintang"},
                {text: "Lokasi Kota", value: "nama_kota"},
                {text: "Harga", value: "harga"},
                {text: "Pesan", value: "actions"},

            ], 
            headersPenerbangan: [
                {text: "Nama Maskapai", value: "nama_maskapai"},
                {text: "Kota Keberangkatan", value: "nama_kota"},
                {text: "Kelas", value:"kelas"},
                {text: "Harga", value: "harga"},
                {text: "Pesan", value: "actions"},

            ],
            user: localStorage.getItem('usename'),
            table: false,
            dialog: false,
        }
    },
    setup() {
        let kota = ref([])

        axios.defaults.headers.common["Authorization"] =
            localStorage.getItem("token_type") + " " + localStorage.getItem("token");

        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/kotas').then(response => {
                //assign state posts with response data
                kota.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        let hotel = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/hotels').then(response => {
                //assign state posts with response data
                hotel.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        let penerbangan = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/penerbangans').then(response => {
                //assign state posts with response data
                penerbangan.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

            let kotaAsal = ref([])
            let kotaTujuan = ref([])

        function check(){  
                //get API from Laravel Backend
                axios.get('http://127.0.0.1:8000/api/kotas/' + transaksi.id_asal).then(response => {
                    //assign state posts with response data
                    kotaAsal.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
            
                //get API from Laravel Backend
                axios.get('http://127.0.0.1:8000/api/kotas/' + transaksi.id_tujuan).then(response => {
                    //assign state posts with response data
                    kotaTujuan.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }
        let hotels = ref([])
        function getHotel(item){  
                //get API from Laravel Backend
                axios.get('http://127.0.0.1:8000/api/hotels/' + item).then(response => {
                    //assign state posts with response data
                    hotels.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }
        let penerbangans = ref([])
        function getPenerbangan(item){  
                //get API from Laravel Backend
                axios.get('http://127.0.0.1:8000/api/penerbangans/' + item).then(response => {
                    //assign state posts with response data
                    penerbangans.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }

        const transaksi = reactive({
            id_asal:'',
            id_tujuan:'',
            id_hotel:'',
            id_penerbangan:'',
            harga:''
        })

        function save(){
            let id_asal = transaksi.id_asal
            let id_tujuan = transaksi.id_tujuan
            let id_hotel = transaksi.id_hotel
            let id_penerbangan = transaksi.id_penerbangan
            let id_user = localStorage.getItem('id_user')
            let harga = transaksi.harga

            axios.post('http://127.0.0.1:8000/api/transaksis', {

                id_asal: id_asal,
                id_tujuan: id_tujuan,
                id_hotel:id_hotel,
                id_penerbangan:id_penerbangan,
                id_user: id_user,
                harga: harga,
            }).then(()=>{
                this.dialog = false;
                window.location.reload()
            }).catch(error=>{
                this.validation.value = error.response.data
                console.log(error);
                console.log("ERROR:: ", error.response.data)
            }) 
        }

        return{
            kota,
            hotel,
            penerbangan,
            transaksi,
            check,
            kotaAsal,
            kotaTujuan,
            getHotel,
            hotels,
            getPenerbangan,
            penerbangans,
            save
        }
    },
    methods:{
        closeDialog() {
            this.dialog = false;
            this.formType = 0;
            this.$refs.form.reset();
        },
        showResult() {
            this.table = true;
        }
    },
}

</script>
