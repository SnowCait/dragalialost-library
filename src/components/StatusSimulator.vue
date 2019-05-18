<template>
    <main>
        <h1>ステータスシミュレーター</h1>

        <section class="equipment">
            <ul>
                <li>
                    <img :src="selectedAdventurer.Image" :alt="selectedAdventurer.Name" v-on:click="showAdventurerList = !showAdventurerList" />
                    <div>Lv{{adventurerLv}}</div>
                    <div>マナサ 50</div>
                    <div>レア {{selectedAdventurer.Rarity}}</div>
                    <div>EX 4</div>
                </li>

                <li>
                    <img :src="selectedWeapon.Image" :alt="selectedWeapon.Name" v-on:click="showWeaponList = !showWeaponList" />
                    <div>Lv{{weaponLv}}</div>
                    <div>完凸<input type="checkbox" v-model="weaponUnbind" /></div>
                </li>

                <li>
                    <img :src="selectedWyrmprint1.Image02" :alt="selectedWyrmprint1.NameJP" v-on:click="showWyrmprint1List = !showWyrmprint1List" />
                    <div>Lv{{wyrmprint1Lv}}</div>
                    <div>完凸<input type="checkbox" v-model="wyrmprint1Unbind" /></div>
                </li>

                <li>
                    <img :src="selectedWyrmprint2.Image02" :alt="selectedWyrmprint2.NameJP" v-on:click="showWyrmprint2List = !showWyrmprint2List" />
                    <div>Lv{{wyrmprint2Lv}}</div>
                    <div>完凸<input type="checkbox" v-model="wyrmprint2Unbind" /></div>
                </li>

                <li>
                    <img :src="selectedDragon.Image" :alt="selectedDragon.Name" v-on:click="showDragonList = !showDragonList" />
                    <div>Lv{{dragonLv}}</div>
                    <div>完凸<input type="checkbox" v-model="dragonUnbind" /></div>
                    <div>♪<input type="number" step="1" min="1" max="30" v-model.number="dragonBond" /></div>
                </li>
            </ul>

            <div>
                <h3>施設</h3>
                <table>
                    <tr>
                        <td></td>
                        <td>HP</td>
                        <td>攻撃力</td>
                    </tr>
                    <tr>
                        <td>属性</td>
                        <td><input type="number" step="0.5" min="0" v-model.number="castleAdventurerHpRate" />%</td>
                        <td><input type="number" step="0.5" min="0" v-model.number="castleAdventurerStrRate" />%</td>
                    </tr>
                    <tr>
                        <td>武器</td>
                        <td><input type="number" step="0.5" min="0" v-model.number="castleWeaponHpRate" />%</td>
                        <td><input type="number" step="0.5" min="0" v-model.number="castleWeaponStrRate" />%</td>
                    </tr>
                    <tr>
                        <td>ドラゴン</td>
                        <td><input type="number" step="0.5" min="0" v-model.number="castleDragonHpRate" />%</td>
                        <td><input type="number" step="0.5" min="0" v-model.number="castleDragonStrRate" />%</td>
                    </tr>
                </table>
            </div>
        </section>

        <section class="adventurers select-list" v-show="showAdventurerList">
            <ul>
                <li v-for="adventurer in adventurersMaster" :key="adventurer.BaseId" v-on:click="selectAdventurer(adventurer)">
                    <img :src="adventurer.Image" :alt="adventurer.Name" />
                </li>
            </ul>
        </section>

        <section class="weapons select-list" v-show="showWeaponList">
            <ul>
                <li v-for="weapon in selectWeaponList" :key="weapon.Id" v-on:click="selectWeapon(weapon)">
                    <img :src="weapon.Image" :alt="weapon.Name" />
                </li>
            </ul>
        </section>

        <section class="wyrmprints select-list" v-show="showWyrmprint1List">
            <ul>
                <li v-for="wyrmprint in wyrmprintsMaster" :key="wyrmprint.Id" v-on:click="selectWyrmprint1(wyrmprint)">
                    <img :src="wyrmprint.Image02" :alt="wyrmprint.NameJP" />
                </li>
            </ul>
        </section>

        <section class="wyrmprints select-list" v-show="showWyrmprint2List">
            <ul>
                <li v-for="wyrmprint in wyrmprintsMaster" :key="wyrmprint.Id" v-on:click="selectWyrmprint2(wyrmprint)">
                    <img :src="wyrmprint.Image02" :alt="wyrmprint.NameJP" />
                </li>
            </ul>
        </section>

        <section class="dragons select-list" v-show="showDragonList">
            <ul>
                <li v-for="dragon in dragonsMaster" :key="dragon.BaseId" v-on:click="selectDragon(dragon)">
                    <img :src="dragon.Image" :alt="dragon.Name" />
                </li>
            </ul>
        </section>

        <section class="status">
            <h2>ステータス</h2>

            <table>
                <tr>
                    <td></td>
                    <td class="status-value">HP</td>
                    <td class="status-value">攻撃力</td>
                    <td class="status-value">戦力</td>
                </tr>
                <tr>
                    <td>キャラクター</td>
                    <td>{{adventurerHp}}</td>
                    <td>{{adventurerStr}}</td>
                    <td>{{adventurerMight}}</td>
                </tr>
                <tr>
                    <td>武器</td>
                    <td>+{{weaponTotalHp}}</td>
                    <td>+{{weaponTotalStr}}</td>
                    <td>+{{weaponTotalMight}}</td>
                </tr>
                <tr>
                    <td>竜輝の護符</td>
                    <td>+{{wyrmprintHp}}</td>
                    <td>+{{wyrmprintStr}}</td>
                    <td>+{{wyrmprintMight}}</td>
                </tr>
                <tr>
                    <td>ドラゴン</td>
                    <td>+{{dragonTotalHp}}</td>
                    <td>+{{dragonTotalStr}}</td>
                    <td>+{{dragonTotalMight}}</td>
                </tr>
                <tr>
                    <td>アビリティ</td>
                    <td>+{{abilityTotalHp}}</td>
                    <td>+{{abilityTotalStr}}</td>
                    <td>+{{abilityTotalMight}}</td>
                </tr>
                <tr>
                    <td>聖城</td>
                    <td>+{{castleTotalHp}}</td>
                    <td>+{{castleTotalStr}}</td>
                    <td>+{{castleTotalMight}}</td>
                </tr>
                <tr>
                    <td>合計</td>
                    <td>{{sumHp}}</td>
                    <td>{{sumStr}}</td>
                    <td>{{sumMight}}</td>
                </tr>
            </table>

            <h3>キャラクター</h3>
            <table>
                <tr>
                    <td></td>
                    <td class="status-value">HP</td>
                    <td class="status-value">攻撃力</td>
                    <td class="status-value">戦力</td>
                </tr>
                <tr>
                    <td>キャラクター</td>
                    <td>{{adventurerHp}}</td>
                    <td>{{adventurerStr}}</td>
                    <td>{{adventurerMight}}</td>
                </tr>
                <tr>
                    <td>アビリティ</td>
                    <td>+0</td>
                    <td>+0</td>
                    <td>+0</td>
                </tr>
                <tr>
                    <td>聖城</td>
                    <td>+{{castleAdventurerHp}}</td>
                    <td>+{{castleAdventurerStr}}</td>
                    <td>+{{castleAdventurerHp + castleAdventurerStr}}</td>
                </tr>
                <tr>
                    <td>合計</td>
                    <td>{{adventurerHp + castleAdventurerHp}}</td>
                    <td>{{adventurerStr + castleAdventurerStr}}</td>
                    <td>{{adventurerTotalMight}}</td>
                </tr>
            </table>

            <h3>武器</h3>
            <table>
                <tr>
                    <td></td>
                    <td class="status-value">HP</td>
                    <td class="status-value">攻撃力</td>
                    <td class="status-value">戦力</td>
                </tr>
                <tr>
                    <td>武器</td>
                    <td>{{weaponHp}}</td>
                    <td>{{weaponStr}}</td>
                    <td>{{weaponMight}}</td>
                </tr>
            </table>

            <h3>護符1</h3>
            <table>
                <tr>
                    <td></td>
                    <td class="status-value">HP</td>
                    <td class="status-value">攻撃力</td>
                    <td class="status-value">戦力</td>
                </tr>
                <tr>
                    <td>護符1</td>
                    <td>{{wyrmprint1Hp}}</td>
                    <td>{{wyrmprint1Str}}</td>
                    <td>{{wyrmprint1Might}}</td>
                </tr>
            </table>

            <h3>護符2</h3>
            <table>
                <tr>
                    <td></td>
                    <td class="status-value">HP</td>
                    <td class="status-value">攻撃力</td>
                    <td class="status-value">戦力</td>
                </tr>
                <tr>
                    <td>護符1</td>
                    <td>{{wyrmprint2Hp}}</td>
                    <td>{{wyrmprint2Str}}</td>
                    <td>{{wyrmprint2Might}}</td>
                </tr>
            </table>

            <h3>ドラゴン</h3>
            <table>
                <tr>
                    <td></td>
                    <td class="status-value">HP</td>
                    <td class="status-value">攻撃力</td>
                    <td class="status-value">戦力</td>
                </tr>
                <tr>
                    <td>ドラゴン</td>
                    <td>{{dragonHp}}</td>
                    <td>{{dragonStr}}</td>
                    <td>{{dragonMight}}</td>
                </tr>
                <tr>
                    <td>聖城</td>
                    <td>+{{castleDragonHp}}</td>
                    <td>+{{castleDragonStr}}</td>
                    <td>+{{castleDragonHp + castleDragonStr}}</td>
                </tr>
                <tr>
                    <td>合計</td>
                    <td>{{dragonHp + castleDragonHp}}</td>
                    <td>{{dragonStr + castleDragonStr}}</td>
                    <td>{{dragonCastleMight}}</td>
                </tr>
            </table>
        </section>
    </main>
</template>

<script>
import adventurersMaster from '../assets/json/Adventurers.json';
import weaponsMaster from '../assets/json/Weapons.json';
import wyrmprintsMaster from '../assets/json/Wyrmprints.json';
import dragonsMaster from '../assets/json/Dragons.json';
import abilitiesMaster from '../assets/json/Abilities.json';
import coAbilitiesMaster from '../assets/json/CoAbilities.json';
const adventurerLevelsMaster = {
    5: 80,
    4: 70,
    3: 60
};
const weaponLevelsMaster = {
    5: 100,
    4: 70,
    3: 40,
    2: 30,
    1: 1
};
const wyrmprintLevelsMaster = {
    5: 100,
    4: 80,
    3: 60,
    2: 40
};
const dragonLevelsMaster = {
    5: 100,
    4: 80,
    3: 60
};

adventurersMaster.sort((a, b) => {
    // 属性順、レアリティ降順、同レアリティ同士は未定義
    if (a.ElementalTypeId == b.ElementalTypeId) {
        return b.Rarity - a.Rarity;  // 降順
    } else {
        return a.ElementalTypeId - b.ElementalTypeId;  // 昇順
    }
});
adventurersMaster.forEach(adventurer => {
    adventurer.Image = require('@/assets/img/adventurer/' + adventurer.Id + '_' + ('0' + adventurer.VariationId).slice(-2) + '_r' + ('0' + adventurer.Rarity).slice(-2) + '.png');
});

weaponsMaster.forEach(weapon => {
    weapon.Image = require('@/assets/img/weapon/' + weapon.BaseId + '_01_' + weapon.FormId + '.png');
});

wyrmprintsMaster.forEach(wyrmprint => {
    wyrmprint.Image01 = require('@/assets/img/wyrmprint/' + wyrmprint.BaseId + '_01.png');
    wyrmprint.Image02 = require('@/assets/img/wyrmprint/' + wyrmprint.BaseId + '_02.png');
});

dragonsMaster.sort((a, b) => {
    // 属性順、レアリティ降順、同レアリティ同士は未定義
    if (a.ElementalTypeId == b.ElementalTypeId) {
        return b.Rarity - a.Rarity;  // 降順
    } else {
        return a.ElementalTypeId - b.ElementalTypeId;  // 昇順
    }
});
dragonsMaster.forEach(dragon => {
    dragon.Image = require('@/assets/img/dragon/' + dragon.BaseId + '_01.png');
});

function commaSeparatedValue(number) {
  return String(number).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

export default {
    methods: {
        selectAdventurer: function (adventurer) {
            const beforeAdventurer = this.selectedAdventurer;
            this.selectedAdventurer = adventurer;
            this.showAdventurerList = false;
            console.log(`select adventurer: [${adventurer.Id}] ${adventurer.Name}`);

            if (beforeAdventurer.WeaponTypeId != adventurer.WeaponTypeId) {
                this.selectWeapon(this.weaponsMaster.filter(weapon => {
                    return weapon.TypeId == adventurer.WeaponTypeId
                        && weapon.ElementalTypeId == adventurer.ElementalTypeId
                        && weapon.Rarity == 5
                        && weapon.Skill != 0;
                }).shift());
            }
        },
        selectWeapon: function (weapon) {
            this.selectedWeapon = weapon;
            this.weaponLv = this.weaponLevelsMaster[weapon.Rarity];
            this.weaponUnbind = true;
            this.showWeaponList = false;
            console.log(`select weapon: [${weapon.Id}] ${weapon.WeaponName}`);
        },
        selectWyrmprint1: function (wyrmprint) {
            this.selectedWyrmprint1 = wyrmprint;
            this.wyrmprint1Lv = this.wyrmprintLevelsMaster[wyrmprint.Rarity];
            this.wyrmprint1Unbind = true;
            this.showWyrmprint1List = false;
            console.log(`select wyrmprint1: [${wyrmprint.BaseId}] ${wyrmprint.NameJP}`);
        },
        selectWyrmprint2: function (wyrmprint) {
            this.selectedWyrmprint2 = wyrmprint;
            this.wyrmprint2Lv = this.wyrmprintLevelsMaster[wyrmprint.Rarity];
            this.wyrmprint2Unbind = true;
            this.showWyrmprint2List = false;
            console.log(`select wyrmprint2: [${wyrmprint.BaseId}] ${wyrmprint.NameJP}`);
        },
        selectDragon: function (dragon) {
            this.selectedDragon = dragon;
            this.dragonLv = this.dragonLevelsMaster[dragon.Rarity];
            this.dragonUnbind = true;
            this.showDragonList = false;
            console.log(`select dragon: [${dragon.BaseId}] ${dragon.Name}`);
        }
    },
    data () {
        return {
            // キャラクター
            adventurersMaster,
            coAbilitiesMaster,
            adventurerLevelsMaster,
            selectedAdventurer: adventurersMaster.filter(adventurer => {
                return adventurer.Id == 110043;  // ヒルデガルド（バレンタインVer）
            })[0],
            adventurerRarity: 5,  // 覚醒済み
            adventurerLv: 80,

            // 武器
            weaponsMaster,
            weaponLevelsMaster,
            selectedWeapon: weaponsMaster.filter(weapon => {
                return weapon.Id == 30850101;  // 赤帝の炎杖
            })[0],
            weaponLv: 100,
            weaponUnbind: true,

            // 護符
            wyrmprintsMaster,
            wyrmprintLevelsMaster,
            abilitiesMaster,
            selectedWyrmprint1: wyrmprintsMaster.filter(wyrmprint => {
                return wyrmprint.BaseId == 400072;  // テンペストグローリー
            })[0],
            wyrmprint1Lv: 100,
            wyrmprint1Unbind: true,
            selectedWyrmprint2: wyrmprintsMaster.filter(wyrmprint => {
                return wyrmprint.BaseId == 400052;  // ケガは私が治します
            })[0],
            wyrmprint2Lv: 100,
            wyrmprint2Unbind: true,
            
            // ドラゴン
            dragonsMaster,
            dragonLevelsMaster,
            selectedDragon: dragonsMaster.filter(dragon => {
                return dragon.Id == 20050104;  // ケルベロス
            })[0],
            dragonLv: 100,
            dragonUnbind: true,
            dragonBond: 30,

            // 聖城
            castleAdventurerHpRate: 20,
            castleAdventurerStrRate: 19,
            castleWeaponHpRate: 23,
            castleWeaponStrRate: 23,
            castleDragonHpRate: 9,
            castleDragonStrRate: 9.5,

            // UI
            showAdventurerList: false,
            showWeaponList: false,
            showWyrmprint1List: false,
            showWyrmprint2List: false,
            showDragonList: false
        }
    },
    mounted () {
        if (localStorage.adventurerId) {
            this.selectedAdventurer = this.adventurersMaster.filter(adventurer => {
                return adventurer.Id == localStorage.adventurerId;
            })[0];
            this.selectAdventurer(this.selectedAdventurer);
        }
        if (localStorage.weaponId) {
            this.selectedWeapon = this.weaponsMaster.filter(weapon => {
                return weapon.Id == localStorage.weaponId;
            })[0];
            this.selectWeapon(this.selectedWeapon);
        }
        if (localStorage.wyrmprint1Id) {
            this.selectedWyrmprint1 = this.wyrmprintsMaster.filter(wyrmprint => {
                return wyrmprint.BaseId == localStorage.wyrmprint1Id;
            })[0];
            this.selectWyrmprint1(this.selectedWyrmprint1);
        }
        if (localStorage.wyrmprint2Id) {
            this.selectedWyrmprint2 = this.wyrmprintsMaster.filter(wyrmprint => {
                return wyrmprint.BaseId == localStorage.wyrmprint2Id;
            })[0];
            this.selectWyrmprint1(this.selectedWyrmprint1);
        }
        if (localStorage.dragonId) {
            this.selectedDragon = this.dragonsMaster.filter(dragon => {
                return dragon.Id == localStorage.dragonId;
            })[0];
            this.selectDragon(this.selectedDragon);
        }

        // 聖城
        // TODO: 施設ごとに設定できるようにして JSON で保存する
        if (localStorage.getItem('castleAdventurerHpRate') !== null) {
            this.castleAdventurerHpRate = localStorage.getItem('castleAdventurerHpRate');
        }
        if (localStorage.getItem('castleAdventurerStrRate') !== null) {
            this.castleAdventurerStrRate = localStorage.getItem('castleAdventurerStrRate');
        }
        if (localStorage.getItem('castleWeaponHpRate') !== null) {
            this.castleWeaponHpRate = localStorage.getItem('castleWeaponHpRate');
        }
        if (localStorage.getItem('castleWeaponStrRate') !== null) {
            this.castleWeaponStrRate = localStorage.getItem('castleWeaponStrRate');
        }
        if (localStorage.getItem('castleDragonHpRate') !== null) {
            this.castleDragonHpRate = localStorage.getItem('castleDragonHpRate');
        }
        if (localStorage.getItem('castleDragonStrRate') !== null) {
            this.castleDragonStrRate = localStorage.getItem('castleDragonStrRate');
        }
    },
    watch: {
        selectedAdventurer(newAdventurer) {
            localStorage.adventurerId = newAdventurer.Id;
        },
        selectedWeapon(newWeapon) {
            localStorage.weaponId = newWeapon.Id;
        },
        selectedWyrmprint1(newWyrmprint1) {
            localStorage.wyrmprint1Id = newWyrmprint1.BaseId;
        },
        selectedWyrmprint2(newWyrmprint2) {
            localStorage.wyrmprint2Id = newWyrmprint2.BaseId;
        },
        selectedDragon(newDragon) {
            localStorage.dragonId = newDragon.Id;
        },

        // 聖城
        castleAdventurerHpRate(newRate) {
            localStorage.setItem('castleAdventurerHpRate', newRate);
        },
        castleAdventurerStrRate(newRate) {
            localStorage.setItem('castleAdventurerStrRate', newRate);
        },
        castleWeaponHpRate(newRate) {
            localStorage.setItem('castleWeaponHpRate', newRate);
        },
        castleWeaponStrRate(newRate) {
            localStorage.setItem('castleWeaponStrRate', newRate);
        },
        castleDragonHpRate(newRate) {
            localStorage.setItem('castleDragonHpRate', newRate);
        },
        castleDragonStrRate(newRate) {
            localStorage.setItem('castleDragonStrRate', newRate);
        }
    },
    computed: {
        // 選択リスト
        selectWeaponList: function () {
            return this.weaponsMaster.filter(weapon => {
                return weapon.TypeId == this.selectedAdventurer.WeaponTypeId;
            }).sort((a, b) => {
                if (a.Rarity == b.Rarity) {
                    return a.ElementalTypeId - b.ElementalTypeId;
                } else {
                    return b.Rarity - a.Rarity;
                }
            });
        },

        // キャラクター
        adventurerHp: function () {
            // 5★ Max + Mana Circle Node Stats + Mana Circle Bonus
            return this.selectedAdventurer.MaxHp
                 + this.selectedAdventurer.PlusHp0
                 + this.selectedAdventurer.PlusHp1
                 + this.selectedAdventurer.PlusHp2
                 + this.selectedAdventurer.PlusHp3
                 + this.selectedAdventurer.PlusHp4
                 + this.selectedAdventurer.McFullBonusHp5;
        },
        adventurerStr: function () {
            // 5★ Max + Mana Circle Node Stats + Mana Circle Bonus
            return this.selectedAdventurer.MaxAtk
                 + this.selectedAdventurer.PlusAtk0
                 + this.selectedAdventurer.PlusAtk1
                 + this.selectedAdventurer.PlusAtk2
                 + this.selectedAdventurer.PlusAtk3
                 + this.selectedAdventurer.PlusAtk4
                 + this.selectedAdventurer.McFullBonusAtk5;
        },
        skillMight: function () {
            return 300 + 200;
        },
        forceStrikeMight: function () {
            return 120;
        },
        coAbilityMight: function () {
            // TODO: Lvで変動させる
            return this.coAbilitiesMaster.filter(ability => {
                return ability.Id == this.selectedAdventurer.ExAbilityData5;
            }).shift().PartyPowerWeight;
        },
        abilityMight: function () {
            return 100 + 100 + 100;
        },
        adventurerMight: function () {
            // Max 5★ HP + Max 5★ Str + Total Skill Might + Force Strike Lv. 2 Might + Co-Ability Might + Total Ability Might
            return this.adventurerHp + this.adventurerStr + this.skillMight + this.forceStrikeMight + this.coAbilityMight + this.abilityMight;
        },
        castleAdventurerHp: function () {
            return Math.ceil(this.adventurerHp * (this.castleAdventurerHpRate + this.castleWeaponHpRate) / 100);
        },
        castleAdventurerStr: function () {
            return Math.ceil(this.adventurerStr * (this.castleAdventurerStrRate + this.castleWeaponStrRate) / 100);
        },
        adventurerTotalMight: function () {
            return this.adventurerMight + this.castleAdventurerHp + this.castleAdventurerStr;
        },

        // 武器
        weaponHp: function () {
            return this.selectedWeapon.MaxHp;
        },
        weaponStr: function () {
            return this.selectedWeapon.MaxAtk;
        },
        weaponSkillMight: function () {
            return 100;
        },
        weaponAbilityMight: function () {
            return 0;
        },
        weaponMight: function () {
            return this.weaponHp + this.weaponStr + this.weaponSkillMight + this.weaponAbilityMight;
        },
        weaponBonusRate: function () {
            // 同属性は 0.5, 他は 0
            return (this.selectedWeapon.ElementalTypeId == this.selectedAdventurer.ElementalTypeId) ? 0.5 : 0;
        },
        weaponBonusHp: function () {
            return Math.ceil(this.weaponHp * this.weaponBonusRate);
        },
        weaponBonusStr: function () {
            return Math.ceil(this.weaponStr * this.weaponBonusRate);
        },
        weaponTotalHp: function () {
            return this.weaponHp + this.weaponBonusHp;
        },
        weaponTotalStr: function () {
            return this.weaponStr + this.weaponBonusStr;
        },
        weaponTotalMight: function () {
            return this.weaponMight + this.weaponBonusHp + this.weaponBonusStr;
        },

        // 竜輝の護符
        wyrmprint1Hp: function () {
            return this.selectedWyrmprint1.MaxHp;
        },
        wyrmprint1Str: function () {
            return this.selectedWyrmprint1.MaxAtk;
        },
        wyrmprint1AbilityMight: function () {
            let abilities = [];
            const wyrmprint = this.selectedWyrmprint1;
            if (wyrmprint.Abilities13 > 0) {
                abilities.push(this.abilitiesMaster.filter(ability => {
                    return ability.Id == commaSeparatedValue(wyrmprint.Abilities13);
                })[0]);
            }
            if (wyrmprint.Abilities23 > 0) {
                abilities.push(this.abilitiesMaster.filter(ability => {
                    return ability.Id == commaSeparatedValue(wyrmprint.Abilities23);
                })[0]);
            }
            if (wyrmprint.Abilities33 > 0) {
                abilities.push(this.abilitiesMaster.filter(ability => {
                    return ability.Id == commaSeparatedValue(wyrmprint.Abilities33);
                })[0]);
            }
            return abilities.reduce((accumulator, currentValue) => accumulator + currentValue.PartyPowerWeight, 0);
        },
        wyrmprint1AbilityHpRate: function () {
            return 0;
        },
        wyrmprint1AbilityStrRate: function () {
            return 0;
        },
        wyrmprint2Hp: function () {
            return this.selectedWyrmprint2.MaxHp;
        },
        wyrmprint2Str: function () {
            return this.selectedWyrmprint2.MaxAtk;
        },
        wyrmprint2AbilityMight: function () {
            let abilities = [];
            const wyrmprint = this.selectedWyrmprint2;
            if (wyrmprint.Abilities13 > 0) {
                abilities.push(this.abilitiesMaster.filter(ability => {
                    return ability.Id == commaSeparatedValue(wyrmprint.Abilities13);
                })[0]);
            }
            if (wyrmprint.Abilities23 > 0) {
                abilities.push(this.abilitiesMaster.filter(ability => {
                    return ability.Id == commaSeparatedValue(wyrmprint.Abilities23);
                })[0]);
            }
            if (wyrmprint.Abilities33 > 0) {
                abilities.push(this.abilitiesMaster.filter(ability => {
                    return ability.Id == commaSeparatedValue(wyrmprint.Abilities33);
                })[0]);
            }
            return abilities.reduce((accumulator, currentValue) => accumulator + currentValue.PartyPowerWeight, 0);
        },
        wyrmprint2AbilityHpRate: function () {
            return 0;
        },
        wyrmprint2AbilityStrRate: function () {
            return 0;
        },
        wyrmprint1Might: function () {
            return this.wyrmprint1Hp + this.wyrmprint1Str + this.wyrmprint1AbilityMight;
        },
        wyrmprint2Might: function () {
            return this.wyrmprint2Hp + this.wyrmprint2Str + this.wyrmprint2AbilityMight;
        },
        wyrmprintHp: function () {
            return this.wyrmprint1Hp + this.wyrmprint2Hp;
        },
        wyrmprintStr: function () {
            return this.wyrmprint1Str + this.wyrmprint2Str;
        },
        wyrmprintMight: function () {
            return this.wyrmprint1Might + this.wyrmprint2Might;
        },

        // ドラゴン
        dragonHp: function () {
            return this.selectedDragon.MaxHp;
        },
        dragonStr: function () {
            return this.selectedDragon.MaxAtk;
        },
        dragonAbilityHpRate: function () {
            // ドラゴンのスキルマスターなさそうだから自分で定義する？
            return 0;
        },
        dragonAbilityStrRate: function () {
            // ドラゴンのスキルマスターなさそうだから自分で定義する？
            return 0.6;
        },
        dragonSkillMight: function () {
            // ドラゴンのスキルマスターなさそうだから自分で定義する？
            return 100;
        },
        dragonAbilityMight: function () {
            // ドラゴンのスキルマスターなさそうだから自分で定義する？
            return 100;
        },
        castleDragonHp: function () {
            return Math.ceil(this.dragonHp * this.castleDragonHpRate / 100);
        },
        castleDragonStr: function () {
            return Math.ceil(this.dragonStr * this.castleDragonStrRate / 100);
        },
        dragonBondMight: function () {
            return this.dragonBond * 10;
        },
        dragonMight: function () {
            // Max HP + Max Str + Lv. 2 Skill Might + Lv. 2 Ability Might + Lv. 30 Bond (* Elemental Matching Bonus)
            return this.dragonHp + this.dragonStr + this.dragonSkillMight + this.dragonAbilityMight + this.dragonBondMight;
        },
        dragonCastleMight: function () {  // 変数名再検討したい
            return this.dragonMight + this.castleDragonHp + this.castleDragonStr;
        },
        dragonBonusRate: function () {
            // 同属性は 0.5, 他は 0
            return (this.selectedDragon.ElementalTypeId == this.selectedAdventurer.ElementalTypeId) ? 0.5 : 0;
        },
        dragonBonusHp: function () {
            return Math.ceil(this.dragonHp * this.dragonBonusRate);
        },
        dragonBonusStr: function () {
            return Math.ceil(this.dragonStr * this.dragonBonusRate);
        },
        dragonTotalHp: function () {
            return this.dragonHp + this.dragonBonusHp;
        },
        dragonTotalStr: function () {
            return this.dragonStr + this.dragonBonusStr;
        },
        dragonTotalMight: function () {
            return this.dragonMight + this.dragonBonusHp + this.dragonBonusStr;
        },

        // 聖城
        castleTotalHp: function () {
            return this.castleAdventurerHp + this.castleDragonHp;
        },
        castleTotalStr: function () {
            return this.castleAdventurerStr + this.castleDragonStr;
        },
        castleTotalMight: function () {
            return this.castleTotalHp + this.castleTotalStr;
        },

        // アビリティ
        totalHp: function () {
            return this.adventurerHp + this.weaponTotalHp + this.wyrmprintHp + this.dragonTotalHp + this.castleTotalHp;
        },
        totalStr: function () {
            return this.adventurerStr + this.weaponTotalStr + this.wyrmprintStr + this.dragonTotalStr + this.castleTotalStr;
        },
        wyrmprintAbilityHp: function () {
            // 本来上限値があるはずだが現状反映されていない
            return Math.ceil(this.totalHp * (this.wyrmprint1AbilityHpRate + this.wyrmprint2AbilityHpRate));
        },
        wyrmprintAbilityStr: function () {
            // 本来上限値があるはずだが現状反映されていない
            return Math.ceil(this.totalStr * (this.wyrmprint1AbilityStrRate + this.wyrmprint2AbilityStrRate));
        },
        dragonAbilityHp: function () {
            return Math.ceil(this.totalHp * this.dragonAbilityHpRate);
        },
        dragonAbilityStr: function () {
            return Math.ceil(this.totalStr * this.dragonAbilityStrRate);
        },
        abilityTotalHp: function () {
            return this.wyrmprintAbilityHp + this.dragonAbilityHp;
        },
        abilityTotalStr: function () {
            return this.wyrmprintAbilityStr + this.dragonAbilityStr;
        },
        abilityTotalMight: function () {
            return 0;  // アビリティUP分は戦力としてカウントしない
        },

        // 合計
        sumHp: function () {
            return this.adventurerHp
                 + this.weaponTotalHp
                 + this.wyrmprintHp
                 + this.dragonTotalHp
                 + this.abilityTotalHp
                 + this.castleTotalHp;
        },
        sumStr: function () {
            return this.adventurerStr
                 + this.weaponTotalStr
                 + this.wyrmprintStr
                 + this.dragonTotalStr
                 + this.abilityTotalStr
                 + this.castleTotalStr;
        },
        sumMight: function () {
            return this.adventurerMight
                 + this.weaponTotalMight
                 + this.wyrmprintMight
                 + this.dragonTotalMight
                 + this.abilityTotalMight
                 + this.castleTotalMight;
        },
    }
}
</script>


<style>
    .equipment > ul {
        list-style: none;
        display: flex;
        padding: 0;
        margin: 0 auto;
        max-width: 600px;
    }
    .equipment > ul > li {
        width: 20%;
    }
    .equipment > ul > li > img {
        width: 80px;
        height: 80px;
    }
    .equipment table {
        margin: 0 auto;
    }
    .equipment input[type="number"] {
        width: 5em;
    }
    .select-list > ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 0 auto;
        max-width: 600px;
    }
    .select-list > ul > li > img {
        width: 48px;
        height: 48px;
    }
    .status > table {
        margin: 0 auto;
    }
    .status-value {
        width: 80px;
    }
</style>

