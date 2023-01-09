export class Currency {
    id: number;
    name: string;
    value: number = 0;
    unlocked: boolean = false;
    defferedAdd: number = 0;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    add(value: number) {
        this.defferedAdd += value;

        if (this.defferedAdd >= 1) {
            const deltaValue = Math.floor(this.defferedAdd);
            this.value += deltaValue;
            this.defferedAdd -= deltaValue;
        }
    }

    spend(value: number) {
        if (this.value >= value) {
            this.value -= value;
            return true;
        }

        return false;
    }
}