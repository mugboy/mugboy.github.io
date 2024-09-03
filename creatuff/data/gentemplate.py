import pathlib
import json

def count_recipes(num):
    if num == 1:
        return 1
    else:
        return num + count_recipes(num-1)


def main():
    words = pathlib.Path("words.txt").read_text().splitlines()
    num_recipes = count_recipes(len(words))

    with open("recipes.json.template", "w") as fp:
        jsondata = {}
        
        for word1 in words:
            for word2 in words:
                comb_str = "+".join(sorted([word1, word2]))
                jsondata[comb_str] = ""



        json.dump(jsondata, fp, indent=4)


if __name__ == "__main__":
    main()