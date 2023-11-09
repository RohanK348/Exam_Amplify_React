# -*- coding: utf-8 -*-
import json
import random


def gender():
    letter = random.choice(["m", "w"])
    number = random.randrange(1, 9)
    img = f"/assets/faces/{letter}{number}.png"
    return img


if __name__ == "__main__":
    with open("countries.json", "rt") as f:
        items = json.load(f)

    items = [i for i in items if i["region"] in ["Europe", "Asia", "America"]]
    items = sorted(items, key=lambda k: k["population"], reverse=True)
    items = [
        {
            "country": {
                "code": i["alpha2Code"].lower(),
                "name": i["name"],
                "region": i["region"],
            },
            "members": [gender() for i in list(range(random.randrange(3, 5)))],
            "progress": {
                "color": random.choice(["blue", "red", "teal", "indigo", "amber"]),
                "value": random.randrange(30, 90),
            },
            "population": i["population"],
        }
        for i in items
    ]
    print(json.dumps(items, indent=4))
