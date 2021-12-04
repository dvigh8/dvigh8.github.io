import os
import platform
import shutil

def update_maps():
    if platform.system() == "Windows":
        repo_path = "../../c19_dash/"
    else:
        repo_path = "."

    for f in os.listdir(repo_path):
        if ".html" in f:
            shutil.copyfile(repo_path + f, "../covid/" + f)
    return "maps updated"