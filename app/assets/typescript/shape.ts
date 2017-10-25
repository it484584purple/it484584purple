import { Init } from './lifecycle';
import { Card } from './card';
import { iGame } from './iGame';

export class Shape extends Card implements Init {
    public shape: iGame[];

    public constructor() {
        super();
        this.onInit();
    }

    public onInit(): void {
        this.shape = [
            { name: 'diamond' },
            { name: 'pill' },
            { name: 'squiggle' }
        ];
    }
}
