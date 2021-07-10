import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="lettuce-sudoku-game" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
