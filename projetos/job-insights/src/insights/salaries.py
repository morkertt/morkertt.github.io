from typing import Union, List, Dict
from src.insights.jobs import read


def get_max_salary(path: str) -> int:
    file = read(path)

    jobs_max_salary = set()

    for job in file:
        if job["max_salary"].isdigit():
            jobs_max_salary.add(int(job["max_salary"]))
    return max(jobs_max_salary)


def get_min_salary(path: str) -> int:
    file = read(path)

    jobs_min_salary = set()

    for job in file:
        if job["min_salary"].isdigit():
            jobs_min_salary.add(int(job["min_salary"]))
    return min(jobs_min_salary)


def matches_salary_range(job: Dict, salary: Union[int, str]) -> bool:
    try:
        max_salary = int(job["max_salary"])
        min_salary = int(job["min_salary"])
        salary_int = int(salary)

        if min_salary > max_salary:
            raise ValueError

        if min_salary <= salary_int <= max_salary:
            return True

    except Exception:
        raise ValueError
    return False


def filter_by_salary_range(
    jobs: List[dict],
    salary: Union[str, int]
) -> List[Dict]:

    filtered_jobs = []

    for job in jobs:
        try:
            salaryInt = int(salary)
            if matches_salary_range(job, salaryInt):
                filtered_jobs.append(job)
        except Exception:
            pass

    return filtered_jobs
