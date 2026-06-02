import csv
from functools import lru_cache
from typing import List, Dict


@lru_cache
def read(path: str) -> List[Dict]:
    with open(path, encoding="utf-8", mode="r") as file:
        all_jobs = csv.DictReader(file, delimiter=',')
        print(all_jobs)
        return list(all_jobs)


def get_unique_job_types(path: str) -> List[str]:
    file = read(path)

    unique_job_types = set()

    for job in file:
        if job["job_type"] is not None:
            unique_job_types.add(job["job_type"])
    return unique_job_types


def filter_by_job_type(jobs: List[Dict], job_type: str) -> List[Dict]:
    filtered_jobs = [job
                     for job in jobs
                     if job["job_type"] == job_type]

    return filtered_jobs
