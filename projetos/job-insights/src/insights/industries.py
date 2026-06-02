from typing import List, Dict
from src.insights.jobs import read


def get_unique_industries(path: str) -> List[str]:
    file = read(path)

    job_industries = set()

    for job in file:
        if job["industry"] != "":
            job_industries.add(job["industry"])
    return job_industries


def filter_by_industry(jobs: List[Dict], industry: str) -> List[Dict]:
    filtered_industry = [job
                         for job in jobs
                         if job["industry"] == industry]

    return filtered_industry
