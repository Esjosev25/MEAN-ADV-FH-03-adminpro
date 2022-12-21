import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css'],
})
export class PromesasComponent implements OnInit {
  ngOnInit(): void {
    this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
    });
    // const promesa = new Promise((resolve, reject) => {
    //   if (!true) {
    //     resolve('HolaMundo');
    //   } else {
    //     reject('algo salio mal');
    //   }
    // });

    // promesa
    //   .then((msg) => {
    //     console.log('termine');
    //     console.log(msg);
    //   })
    //   .catch((error) => console.log('error en mi promesa', error));
    // console.log('Fin del Init');
  }

  getUsuarios() {
    const promesa = new Promise((resolve) => {
      fetch('https://reqres.in/api/users').then((resp) =>
        resp.json().then((body) => resolve(body.data))
      );
    });
    return promesa;
  }
}
