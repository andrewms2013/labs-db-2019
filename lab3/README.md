
# Лабораторна робота No 3. Засоби оптимізації роботи СУБД PostgreSQL


## Варіант завданн

15 варіант згідно номера залікової книжки

| Види індексів | Умови для тригера    |
|---------------|----------------------|
| Hash, BRIN    | before delete, update|

## Предметна галузь

Ветеринарна клініка

## ER-діаграма

![ER model](../lab1/er-diagrams.png)

## Таблиці

### Animals
![Animals](../lab1/table1.png)
### Animals_Doctor
![Animals_Doctors](../lab1/table2.png)
### Clients
![Clients](../lab1/table3.png)
### Clinics
![Clinics](../lab1/table4.png)
### Doctors
![Doctors](../lab1/table5.png)

## Опис структури бази даних

| Відношення | Атрибут | Тип даних |
|------------|---------|--------------------|
| _Відношення "**Animals**"_ <br> Вміщує інформацію про тварин, що лікуються або лікувались в клініці | <span style="color:red">_id_</span> — унікальний номер тварини<br> _name_ — кличка тварини <br> _birthdate_ — дата народження тварини <br> _animal_passport_id_ — серія та номер паспорту тварини <br> <span style="color:blue">_type_</span> — тип тварини <br> <span style="color:blue">_owner_id_</span> — ідентифікатор хазяїна | Числовий <br> Текстовий<br> Дата <br> Текстовий <br> Текстовий <br> Числовий|
| _Відношення "**Clients**"_ <br> Вміщує інформацію про клієнтів клініки | <span style="color:red">_id_</span> — унікальний ідентифікатор клієнту<br> _has_discount_ — наявність знижки<br> _clinic_id_ — ідентифікатор відділення, за якою закріплений клієнт <br> _name_ — ім'я клієнта <br> _surname_ — призвище кліента| Числовий <br> Булеан<br> Числовий <br> Текстовий<br> Текстовий |
| _Відношення "**Clinics**"_ <br> Вміщує інформацію про відділення клінік| <span style="color:red">_id_</span> — унікальний номер клініки <br> _avaries_quantity_ — кількість вольєрів <br> _city_ — місто знаходження відділення <br> _street_ — вулиця знаходження відділення <br> _house_ — дім знаходження відділення | Числовий <br> Числовий <br> Текстовий <br> Текстовий <br> Текстовий |
| _Відношення "**Doctors**"_ <br> Вміщує інформацію про докторів, що працюють в клініці | <span style="color:red">_id_</span> — унікальний номер доктора<br> _clinic_id_ — номер клініки, в якій працює доктор <br> _name_ — ім'я доктора <br> _surname_ — призвище доктора<br> _speciality_ — спеціальність доктора <br> _qualification_ — кваліфікація доктора | Числовий <br> Числовий <br> Текстовий <br> Текстовий <br> Текстовий <br> Текстовий
| _Відношення "**Animals_Doctors**"_ <br> Вміщує інформацію про те, які тварини лікуються у яких докторів | <span style="color:red">_animal_id_</span> — номер тварини<br> _doctor_id_ — номер доктора | Числовий <br> Числовий



## Завдання №2: команди створення індексів, тексти і час виконання запитів SQL

### Команди SQL створення індексів

```sql
CREATE INDEX IF NOT EXISTS hash_index ON "Animal" USING hash (name);

CREATE INDEX IF NOT EXISTS aviaries_brin_index ON "Clinic" USING brin (aviaries_quantity);
``` 

### SQL запити
```sql
SELECT * FROM goods WHERE invoice_num = 170;
```

![lab](img/ind_1.png)

```sql
Explain analyze select * from "Clinic" where aviaries_quantity > 30 and aviaries_quantity < 50
```

![lab](img/4.png)

## Завдання №3: команди, що ініціюють виконання тригера, текст тригера та скріншоти зі змінами у таблицях бази даних

### Код тригеру


### При видаленні тварини із бази даних, її ім'я заноситься в таблицю з видаленими тваринами


