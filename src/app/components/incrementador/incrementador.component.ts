import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css'],
})
export class IncrementadorComponent {
  @Input('valor') progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();
  cambiarValor(valor: number) {
    const newValue = this.progreso + valor;
    if (newValue <= 100 && newValue >= 0) this.progreso = newValue;
    else this.progreso = this.progreso >= 100 ? 100 : 0;
    this.valorSalida.emit(this.progreso);
  }
  onChange(valor: number) {
    console.log(valor);
    if (valor <= 100 && valor >= 0) this.progreso = valor;
    else this.progreso = valor >= 100 ? 100 : 0;

    this.valorSalida.emit(this.progreso);
  }
}
