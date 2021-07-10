import { Component, h, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'lettuce-modal',
  styleUrl: 'lettuce-modal.css',
})
export class LettuceModal {
  @Element() el: HTMLElement;

  async closeModal() {
    await (this.el.closest('ion-modal') as 
           HTMLIonModalElement).dismiss();
  }

  @Event() generateBoard: EventEmitter<string>

  async getNewGame(hints: string) {
    this.generateBoard.emit(hints);
    await this.closeModal();
  }

  render() {
    return [
      <ion-content class="ion-padding">
        <ion-text><h3>Select your preferred difficulty</h3></ion-text>
        <ion-text><h4>I want to solve a puzzle...</h4></ion-text>
        <lettuce-button text="while asleep." type="primary" fluid size-selection="lg" onClick={() => this.getNewGame('easy')} />
        <lettuce-spacing-vertical size-selection="xxs" />
        <lettuce-button text="before I've had coffee." type="primary" fluid size-selection="lg" onClick={() => this.getNewGame('medium')} />
        <lettuce-spacing-vertical size-selection="xxs" />
        <lettuce-button text="fully conscious." type="primary" fluid size-selection="lg" onClick={() => this.getNewGame('hard')} />
        <lettuce-spacing-vertical size-selection="xxs" />
        <lettuce-button text="as a relaxing exercise." type="primary" fluid size-selection="lg" onClick={() => this.getNewGame('very-hard')} />
        <lettuce-spacing-vertical size-selection="xxs" />
        <lettuce-button text="as a test of my will." type="primary" fluid size-selection="lg" onClick={() => this.getNewGame('insane')} />
        <lettuce-spacing-vertical size-selection="xxs" />
        <lettuce-button text="that I'll never finish" type="primary" fluid size-selection="lg" onClick={() => this.getNewGame('inhuman')} />
      </ion-content>
    ]
  }
}
