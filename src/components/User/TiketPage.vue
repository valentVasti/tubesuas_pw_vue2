<template>
    <v-main>
        <v-container>
            <v-card width="800" class="mx-auto px-5 rounded-b-xl mt-4" elevation="3" color="darkgoldenrod">
                <v-card-title class="mx-2">
                    <span>
                        <strong>Cari Penerbangan</strong>
                    </span>
                </v-card-title>
                <v-divider class="mx-auto" color="black"></v-divider>
                <v-container class="mt-3">
                    <v-form ref="form">
                        <v-row>
                            <v-col>
                                <v-select :items="kotas" required v-model="form.asal" outlined label="Kota Asal"></v-select>
                            </v-col>
                            <v-col>
                                <v-select :items="kotas" required outlined v-model="form.tujuan" label="Kota Tujuan"></v-select>
                            </v-col>
                        </v-row>
                        <v-row class="mt-0">
                            <v-col>
                                <v-text-field required outlined readonly v-model="form.tanggal" @click="dialogDate = true" label="Tanggal"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select :items="kelas" required outlined v-model="form.kelas" label="Kelas"></v-select>
                            </v-col>
                        </v-row>
                    </v-form>
                    <v-card-actions>
                        <v-btn large width="100px" class="mx-auto" color="black">
                            <span class="text-button">Pesan</span>
                        </v-btn>
                    </v-card-actions>
                </v-container>
                <v-dialog v-model="dialogShow" width="450">
                    <v-card elevation="3" style="border-radius: 10px;">
                        <v-divider></v-divider>
                        <v-card-content>
                            <div v-for="(item, i) in Pesawats" :key="i">
                                <v-card outlined class="mx-2 my-4 pa-1" color="black">
                                    <v-card-title>
                                        <span class="my-1" style="font-size: 80%;"><strong>{{item.name}}</strong></span>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-content>
                                        <v-row class="mx-1 mt-2 mb-0">
                                            <v-col>
                                                <span v-if="item.from_id==1">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Asal" value="Yogyakarta"></v-text-field>
                                                </span>
                                                <span v-else-if="item.from_id==2">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Asal" value="Samarinda"></v-text-field>
                                                </span>
                                                <span v-else-if="item.from_id==3">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Asal" value="Riau"></v-text-field>
                                                </span>
                                                <span v-if="item.from_id==4">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Asal" value="Medan"></v-text-field>
                                                </span>
                                                <span v-else-if="item.from_id==5">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Asal" value="Bali"></v-text-field>
                                                </span>
                                                <span v-else-if="item.from_id==6">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Asal" value="Makasar"></v-text-field>
                                                </span>
                                                <span v-else-if="item.from_id==7">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Asal" value="Pontianak"></v-text-field>
                                                </span>
                                                <span v-else-if="item.from_id==8">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Asal" value="Jakarta"></v-text-field>
                                                </span>
                                            </v-col>
                                            <v-col>
                                                <span v-if="item.to_id==1">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Tujuan" value="Yogyakarta"></v-text-field>
                                                </span>
                                                <span v-else-if="item.to_id==2">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Tujuan" value="Samarinda"></v-text-field>
                                                </span>
                                                <span v-else-if="item.to_id==3">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Tujuan" value="Riau"></v-text-field>
                                                </span>
                                                <span v-if="item.to_id==4">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Tujuan" value="Medan"></v-text-field>
                                                </span>
                                                <span v-else-if="item.to_id==5">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Tujuan" value="Bali"></v-text-field>
                                                </span>
                                                <span v-else-if="item.to_id==6">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Tujuan" value="Makasar"></v-text-field>
                                                </span>
                                                <span v-else-if="item.to_id==7">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Tujuan" value="Pontianak"></v-text-field>
                                                </span>
                                                <span v-else-if="item.to_id==8">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Tujuan" value="Pontianak"></v-text-field>
                                                </span>
                                            </v-col>
                                        </v-row>
                                        <v-row class="mx-1 mt-0">
                                            <v-col>
                                                <span v-if="item.kelas==1">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Kelas" value="Ekonomi"></v-text-field>
                                                </span>
                                                <span v-else-if="item.kelas==2">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Kelas" value="Bisnis"></v-text-field>
                                                </span>
                                                <span v-else-if="item.kelas==3">
                                                    <v-text-field rounded outlined readonly max-width="100%" label="Kelas" value="Sleeper"></v-text-field>
                                                </span>
                                            </v-col>
                                        </v-row>
                                        <v-row class="mx-1 mb-0">
                                            <v-col>
                                                <v-text-field rounded outlined readonly v-model="item.jadwal_keberangkatan" max-width="50%" label="Jadwal Berangkat"></v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field rounded outlined readonly v-model="item.jadwal_tiba" max-width="50%" label="Jadwal Tiba"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-card-content> 
                                    <v-card-actions>
                                        <v-btn small width="100%" class="mt-0" color="teal" style="color: white;">Pesan Sekarang</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </div>
                        </v-card-content>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDate" width="300">
                    <v-date-picker show-current v-model="form.tanggal">
                        <v-spacer></v-spacer>
                        <v-btn @click="dialogDate = false" color="red darken-1">
                            <span style="color: white;">Batal</span>
                        </v-btn>
                        <v-btn @click="dialogDate = false" color="green">
                            <span style="color: white;">Simpan</span>
                        </v-btn>
                    </v-date-picker>
                </v-dialog>
            </v-card>
        </v-container>
    </v-main>
</template>
<script>
export default{
    
    data(){
        return{
            dialogDate: false,
            dialogShow: false,
            temp: '',
            load: false,
            form: {
                asal: '',
                tujuan: '',
                tanggal: '',    
                kelas: '',
            },
            tempPesawat: [],
            Pesawats:[],
            kotas:
            [
                {text: "Yogyakarta", value:1},
                {text: "Samarinda", value:2},
                {text: "Riau", value:3},
                {text: "Medan", value:4},
                {text: "Bali", value:5},
                {text: "Makasar", value:6},
            ],
            kelas:
            [
                {text: "Ekonomi", value:1},
                {text: "Premium", value:2},
                {text: "First class", value:3}
            ],
        
        }
    },
    methods: {
        readData(){
            var url = this.$api + '/pesawats';
            this.$http.get(url, {
                params:{
                    from_id : this.form.asal,
                    to_id : this.form.tujuan,
                    jadwal_keberangkatan : this.form.tanggal,
                    kelas : this.form.kelas
                }
                // headers: {
                // 'Authorization' : 'Bearer ' + localStorage.getItem('token')
                // }
            }).then(response => {
                this.Pesawats = response.data.data;
                this.load =true
                this.dialogShow = true
            })
        },
    }
}
</script>
<style scoped>
    span{
        color: black;
        color: darkgoldenrod;
        color: orangered;
    }
    span.text-button{
        color:white;
        font-size: 50%;
    }
</style>