import { Init } from './lifecycle';
import { Card } from './card';
import { iGame } from './iGame';

export class Color extends Card implements Init {
    public color: iGame[];

    public constructor() {
        super();
        this.onInit();
    }

    public onInit(): void {
        this.color = [
            { name: 'red' },
            { name: 'green' },
            { name: 'blue' }
        ];
    }
}
