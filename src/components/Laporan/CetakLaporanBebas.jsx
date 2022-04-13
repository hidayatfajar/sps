import React, { Component } from "react";

export default class Laporan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }
  render() {
    const data = this.state.data;
    let data_tagihan = [];
    for (let i = 0; i < 3; i++) {
      if (Object.values(data)[i]) {
        data_tagihan.push(Object.values(data)[i]);
      }
    }

    let data_arr = [];
    for (let i = 0; i < data_tagihan[0].length; i++) {
      let data_arr_temp = [];
      data_arr_temp.push(data_tagihan[0][i].siswa_nama);
      for (let j = 0; j < 3; j++) {
        // check if data_tagihan and data_bulan is not empty then push data
        if (data_tagihan[j] && data_tagihan[j][i]) {
          data_arr_temp.push(data_tagihan[j][i].sisa_bulan);
          data_arr_temp.push(data_tagihan[j][i].sisa_tagihan);
        } else {
          data_arr_temp.push("-");
          data_arr_temp.push("-");
        }
      }
      data_arr.push(data_arr_temp);
    }

    console.log(data_arr)

    let arr = [];
    for (let i = 0; i < 3; i++) {
      if (Object.keys(data)[i] == null) {
        arr.push("-");
      } else {
        arr.push(Object.keys(data)[i]);
      }
    }
    return (
      <div>
        <br />
        <h4 className="text-center">Laporan Kelas</h4>
        <center>
          <table style={{ borderCollapse: "collapse", width: "95%" }}>
            <tr style={{ border: "1px solid black", textAlign: "left" }}>
              <th className="text-center" colSpan={7}>
                {data_tagihan[0][0].jurusan_nama}{" "}
                {data_tagihan[0][0].d_kelas_nama}
              </th>
            </tr>
            <tr style={{ border: "1px solid black", textAlign: "left" }}>
              <th></th>
              {arr.map((item) => {
                return (
                  <th className="text-center" key={item.id}>
                    {item}
                  </th>
                );
              })}
            </tr>
            <tr style={{ border: "1px solid black", textAlign: "center" }}>
              <th>Nama </th>
              <th>Sisa Tagihan</th>
              <th>Sisa Tagihan</th>
              <th>Sisa Tagihan</th>
            </tr>
            {data_arr.map((item) => {
              return (
                <tr style={{ border: "1px solid black", textAlign: "center" }}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                </tr>
              );
            })}
          </table>
        </center>
      </div>
    );
  }
}
