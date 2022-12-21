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
            </v-row>
        </v-card>
        <v-card elevation="3" style="border-radius: 6px;" class="mt-5 mx-6">
            <v-data-table :headers="headersHotel" 
            :items="hotel" :search="kotaAsal.nama_kota" 
            :items-per-page="10">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn color="green" class="mr-2" @click="transaksi.id_hotel = item">Pilih</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-card elevation="3" style="border-radius: 6px;" class="mt-5 mx-6">
            <v-data-table :headers="headersPenerbangan" 
            :items="penerbangan" :search="kotaTujuan.nama_kota" 
            :items-per-page="10">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn color="green" class="mr-2" @click="transaksi.id_penerbangan = item">Pilih</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-card elevation="3" style="border-radius: 6px;" class="mt-5 mx-6">
            <h1>Form Data</h1>
                <v-container> 
                    <v-form ref="form">
                        <v-row justify="center" align="center" style="margin:3px auto;">
                            <v-col>
                                <v-select :items="kota" item-text="nama_kota" item-value="id" v-model="transaksi.id_asal" label="Kota Asal" disabled></v-select>
                            </v-col>
                            <v-col>
                                <v-select :items="kota" item-text="nama_kota" item-value="id" v-model="transaksi.id_tujuan" label="Kota Tujuan" disabled></v-select>
                            </v-col>
                        </v-row>
                        <v-row></v-row>
                        <v-row justify="center" align="center" style="margin:3px auto;">
                            <v-select :items="hotel" item-text="nama_hotel" item-value="id" v-model="transaksi.id_hotel" label="Nama Hotel" disabled></v-select>
                            <v-select :items="hotel" item-text="bintang" item-value="id" v-model="transaksi.id_hotel" label="Bintang" disabled></v-select>
                            <v-select :items="hotel" item-text="nama_kota" item-value="id" v-model="transaksi.id_hotel" label="Kota" disabled></v-select>
                            <v-select :items="hotel" item-text="harga" item-value="id" v-model="transaksi.id_hotel" label="Harga" disabled></v-select>
                        </v-row>
                        <v-row></v-row>
                        <v-row justify="center" align="center" style="margin:3px auto;">
                            <v-select :items="penerbangan" item-text="nama_maskapai" item-value="id" v-model="transaksi.id_penerbangan" label="Nama Maskapai" disabled></v-select>
                            <v-select :items="penerbangan" item-text="nama_kota" item-value="id" v-model="transaksi.id_penerbangan" label="Kota Asal" disabled></v-select>
                            <v-select :items="penerbangan" item-text="nama_kota" item-value="id" v-model="transaksi.id_tujuan" label="Kota Tujuan" disabled></v-select>
                            <v-select :items="penerbangan" item-text="kelas" item-value="id" v-model="transaksi.id_penerbangan" label="Kelas" disabled></v-select>
                            <v-select :items="penerbangan" item-text="harga" item-value="id" v-model="transaksi.id_penerbangan" label="Harga" disabled></v-select>
                        </v-row>
                        <!-- <v-row>
                            <v-text>{{ username }}</v-text>
                            <v-text>{{ harga }}</v-text>
                        </v-row> -->
                        <v-row>
                            <v-btn @click="save()">Simpan</v-btn>
                        </v-row>
                        <v-row></v-row>
                    </v-form>
                </v-container> 
        </v-card>
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
            username: localStorage.getItem('usename'),
            harga: 1+1,
        }
    },
    setup() {
        let kota = ref([])

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

        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/kotas/' + transaksi.id_asal).then(response => {
                //assign state posts with response data
                kotaAsal.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })
        let kotaTujuan = ref([])

        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/kotas/' + transaksi.id_tujuan).then(response => {
                //assign state posts with response data
                kotaTujuan.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

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
                this.$router.push({
                    name: 'PaketPage'
                })
                this.closeDialog()
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
            kotaAsal,
            kotaTujuan,
            transaksi,
            save
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
