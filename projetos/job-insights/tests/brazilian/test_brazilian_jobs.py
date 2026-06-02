from src.pre_built.brazilian_jobs import read_brazilian_file


def test_brazilian_jobs():
    test_language = read_brazilian_file("tests/mocks/brazilians_jobs.csv")

    for job in test_language:
        assert job.get("salario") is None
        assert job.get("salary") is not None
