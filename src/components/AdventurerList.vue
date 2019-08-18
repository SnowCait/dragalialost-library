<template>
    <main>
        <h1>ドラガリ キャラ一覧</h1>
        <table>
            <thead>
                <tr>
                    <th>アイコン</th>
                    <th>名前</th>
                    <th :class="sortedClass('Hp')" v-on:click="sortBy('Hp')">HP</th>
                    <th :class="sortedClass('Atk')" v-on:click="sortBy('Atk')">攻撃力</th>
                    <th class="hidden">スキル</th>
                    <th class="hidden">バースト</th>
                    <th class="hidden">アビリティ</th>
                    <th class="hidden">EXアビリティ</th>
                    <th :class="sortedClass('Might')" v-on:click="sortBy('Might')">戦力</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="adventurer in sortedAdventurers" :key="adventurer.Key">
                    <td>
                        <img :src="adventurer.Image" />
                    </td>
                    <td class="text">
                        {{adventurer.Name}}
                    </td>
                    <td class="number">
                        {{adventurer.Hp}}
                    </td>
                    <td class="number">
                        {{adventurer.Atk}}
                    </td>
                    <td class="number hidden">
                        {{adventurer.SkillMight}}
                    </td>
                    <td class="number hidden">
                        {{adventurer.ForceStrikeMight}}
                    </td>
                    <td class="number hidden">
                        {{adventurer.AbilityMight}}
                    </td>
                    <td class="number hidden">
                        {{adventurer.CoAbilityMight}}
                    </td>
                    <td class="number">
                        {{adventurer.Might}}
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script>
import adventurers from '@/assets/json/Adventurers.min.json'
import abilities from '@/assets/json/Abilities.min.json'
import coAbilities from '@/assets/json/CoAbilities.min.json'

adventurers.forEach(adventurer => {
    adventurer.Key = adventurer.Id.toString() + ('0' + adventurer.VariationId).slice(-2);
    adventurer.Image = require('@/assets/img/adventurer/' + adventurer.Id + '_0' + adventurer.VariationId + '_r' + ('0' + adventurer.Rarity).slice(-2) + '.png');

    let hp = adventurer.MaxHp;
    hp += adventurer.PlusHp0;
    hp += adventurer.PlusHp1;
    hp += adventurer.PlusHp2;
    hp += adventurer.PlusHp3;
    hp += adventurer.PlusHp4;
    hp += adventurer.McFullBonusHp5;
    adventurer.Hp = hp;

    let atk = adventurer.MaxAtk;
    atk += adventurer.PlusAtk0;
    atk += adventurer.PlusAtk1;
    atk += adventurer.PlusAtk2;
    atk += adventurer.PlusAtk4;
    atk += adventurer.PlusAtk3;
    atk += adventurer.McFullBonusAtk5;
    adventurer.Atk = atk;

    adventurer.SkillMight = 500;
    adventurer.ForceStrikeMight = 120;

    // Ability
    let abilityMight = 0;
    if (adventurer.Abilities12 > 0) {
        let ability1 = abilities.filter(ability => {
            return ability.Id == adventurer.Abilities12;
        })[0];
        if (ability1 == null && adventurer.Abilities11 > 0) {
            ability1 = abilities.filter(ability => {
                return ability.Id == adventurer.Abilities11;
            })[0];
        }
        abilityMight += ability1 != null ? ability1.PartyPowerWeight : 0;
    }
    if (adventurer.Abilities22 > 0) {
        let ability2 = abilities.filter(ability => {
            return ability.Id == adventurer.Abilities22;
        })[0];
        if (ability2 == null && adventurer.Abilities21 > 0) {
            ability2 = abilities.filter(ability => {
                return ability.Id == adventurer.Abilities21;
            })[0];
        }
        abilityMight += ability2 != null ? ability2.PartyPowerWeight : 0;
    }
    if (adventurer.Abilities32 > 0) {
        let ability3 = abilities.filter(ability => {
            return ability.Id == adventurer.Abilities32;
        })[0];
        if (ability3 == null && adventurer.Abilities31 > 0) {
            ability3 = abilities.filter(ability => {
                return ability.Id == adventurer.Abilities31;
            })[0];
        }
        abilityMight += ability3 != null ? ability3.PartyPowerWeight : 0;
    }
    adventurer.AbilityMight = abilityMight;

    // CoAbility
    adventurer.CoAbilityMight = coAbilities.filter(ability => {
        return ability.Id == adventurer.ExAbilityData5;
    })[0].PartyPowerWeight

    adventurer.Might = adventurer.Hp
                     + adventurer.Atk
                     + adventurer.SkillMight
                     + adventurer.ForceStrikeMight
                     + adventurer.AbilityMight
                     + adventurer.CoAbilityMight;
});
export default {
    data () {
        return {
            adventurers,
            sort: {
                key: 'Might',
                isAsc: false,
            },
        }
    },
    computed: {
        sortedAdventurers () {
            const adventurers = this.adventurers.slice();
            adventurers.sort((a, b) => {
                const aValue = a[this.sort.key];
                const bValue = b[this.sort.key];
                return (aValue === bValue ? 0 : aValue > bValue ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
            });
            return adventurers;
        }
    },
    methods: {
        sortedClass (key) {
            return this.sort.key === key ? `sorted ${this.sort.isAsc ? 'asc' : 'desc' }` : 'sorted';
        },
        sortBy (key) {
        this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
        this.sort.key = key;
        },
    }
}
</script>

<style>
.hidden {
    display: none;
}
table {
    margin: 0 auto;
}
table td.text {
    text-align: left;
    padding-left: 10px;
    padding-right: 10px;
}
table td.number {
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
}
table img {
    width: 50px;
    height: 50px;
}
table th.sorted {
    cursor: pointer;
}
table th.sorted::after {
    font-size: 50%;
    content: '▽';
}
table th.sorted.asc::after {
    content: '▲';
}
table th.sorted.desc::after {
    content: '▼';
}

/* Smart Phone */
@media (max-width: 480px) {
    table th {
        font-size: 0.7em;
    }
}
</style>
