import { Init } from './lifecycle';
import { Card } from './card';
import { iGame } from './iGame';

export class Count extends Card implements Init {
    public count: iGame[];
    
    public constructor() {
        super();
        this.onInit();
    }

    public onInit(): void {
        this.count = [
            { name: '1' },
            { name: '2' },
            { name: '3' }
        ];
    }
}
