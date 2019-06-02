<template>
    <main>
        <table class="matrix">
            <thead>
                <tr>
                    <th>
                    </th>
                    <th v-for="(image, element) in elements" :key="element">
                        <img :src="image" />
                    </th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(image, weapon) in weapons" :key="weapon">
                <td>
                    <img :src="image" />
                </td>
                <td v-for="(image, element) in elements" :key="element">
                    <ul>
                        <li v-for="adventurer in matrix[element][weapon]" :key="adventurer.BaseId">
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
import adventurersMaster from '../assets/json/Adventurers.json';

adventurersMaster.forEach(adventurer => {
    adventurer.Image = require('@/assets/img/adventurer/' + adventurer.Id + '_' + ('0' + adventurer.VariationId).slice(-2) + '_r' + ('0' + adventurer.Rarity).slice(-2) + '.png');
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
    data () {
        return {
            matrix,
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
    }
}
</script>

<style>
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

