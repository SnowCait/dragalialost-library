<template>
    <main>
        <h1>ドラガリ キャラ表</h1>
        <ul class="rarity-filter">
            <li v-bind:class="{ disable: !rarityEnabled[3] }" v-on:click="filterRarity(3)">
                <img src="@/assets/img/ui/rarity/Icon_Rarity_3.png" />
            </li>
            <li v-bind:class="{ disable: !rarityEnabled[4] }" v-on:click="filterRarity(4)">
                <img src="@/assets/img/ui/rarity/Icon_Rarity_4.png" />
            </li>
            <li v-bind:class="{ disable: !rarityEnabled[5] }" v-on:click="filterRarity(5)">
                <img src="@/assets/img/ui/rarity/Icon_Rarity_5.png" />
            </li>
        </ul>
        <table class="matrix">
            <thead>
                <tr>
                    <td>
                        ({{adventurersCount.total}})
                    </td>
                    <td v-for="(image, element) in elements" :key="element">
                        <img :src="image" />
                        <span>({{adventurersCount.elements[element]}})</span>
                    </td>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(image, weapon) in weapons" :key="weapon">
                <td>
                    <img :src="image" />
                    <span>({{adventurersCount.weapons[weapon]}})</span>
                </td>
                <td v-for="(image, element) in elements" :key="element">
                    <ul>
                        <li v-for="adventurer in matrix[element][weapon]" :key="adventurer.BaseId" v-if="rarityEnabled[adventurer.Rarity]">
                            <img :src="adventurer.Image" />
                        </li>
                    </ul>
                </td>
            </tr>
            </tbody>
        </table>
    </main>
</template>

<script>
import adventurersMaster from '../assets/json/Adventurers.min.json';

adventurersMaster.forEach(adventurer => {
    adventurer.Image = require('@/assets/img/adventurer/' + adventurer.Id + '_0' + adventurer.VariationId + '_r' + ('0' + adventurer.Rarity).slice(-2) + '.png');
});

let matrix = {
    1: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], },
    2: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], },
    3: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], },
    4: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], },
    5: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], },
};
adventurersMaster.forEach(adventurer => {
    matrix[adventurer.ElementalTypeId][adventurer.WeaponTypeId].push(adventurer);
});

export default {
    methods: {
        filterRarity (rarity) {
            this.rarityEnabled[rarity] = !this.rarityEnabled[rarity];
            this.countAdventurers();
        },
        countAdventurers: function () {
            let total = 0;
            let elements = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
            };
            let weapons = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
            };
            adventurersMaster.forEach(adventurer => {
                if (this.rarityEnabled[adventurer.Rarity]) {
                    total++;
                    elements[adventurer.ElementalTypeId]++;
                    weapons[adventurer.WeaponTypeId]++;
                }
            });
            this.adventurersCount = {
                total: total,
                elements: elements,
                weapons: weapons,
            };
        }
    },
    data () {
        return {
            matrix,
            adventurersCount: {
                total: 0,
                elements: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,
                },
                weapons: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,
                    6: 0,
                    7: 0,
                    8: 0,
                },
            },

            rarityEnabled: { 3: true, 4: true, 5: true },

            elements: {
                1: require('@/assets/img/ui/element/Icon_Element_Flame.png'),
                2: require('@/assets/img/ui/element/Icon_Element_Water.png'),
                3: require('@/assets/img/ui/element/Icon_Element_Wind.png'),
                4: require('@/assets/img/ui/element/Icon_Element_Light.png'),
                5: require('@/assets/img/ui/element/Icon_Element_Shadow.png'),
            },
            weapons: {
                1: require('@/assets/img/ui/weapon/Icon_Weapon_Sword.png'),
                2: require('@/assets/img/ui/weapon/Icon_Weapon_Blade.png'),
                3: require('@/assets/img/ui/weapon/Icon_Weapon_Dagger.png'),
                4: require('@/assets/img/ui/weapon/Icon_Weapon_Axe.png'),
                5: require('@/assets/img/ui/weapon/Icon_Weapon_Lance.png'),
                6: require('@/assets/img/ui/weapon/Icon_Weapon_Bow.png'),
                7: require('@/assets/img/ui/weapon/Icon_Weapon_Wand.png'),
                8: require('@/assets/img/ui/weapon/Icon_Weapon_Staff.png'),
            },
        }
    },
    created: function () {
        this.countAdventurers();
    },
}
</script>

<style>
.rarity-filter {
    list-style: none;
    display: flex;
    margin: 1em auto;
    padding: 0;
    width: 152px;
    border: solid 1px gray;
    border-radius: 5px;
}
.rarity-filter li {
    padding-top: 2;
    width: 50px;
    cursor: pointer;
}
.rarity-filter li + li {
    border-left: solid 1px gray;
}
.rarity-filter li img {
    width: 30px;
    height: 30px;
    display: block;
    margin: 2px auto;
}
.rarity-filter li.disable {
    background-color: lightgray;
}
.rarity-filter li.disable img {
    filter: grayscale(70%);
}
.matrix {
    width: 100%;
}
.matrix thead img {
    width: 30px;
    height: 30px;
}
.matrix tbody td:first-child img {
    width: 30px;
    height: 30px;
}
.matrix ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
}
.matrix ul li {
    margin: 0;
    padding: 0;
    width: 50px;
    height: 50px;
}
.matrix ul img {
    width: 50px;
    height: 50px;
}
</style>

