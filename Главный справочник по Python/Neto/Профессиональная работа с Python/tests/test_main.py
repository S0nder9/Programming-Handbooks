from unittest import TestCase, expectedFailure, skipIf
from main import sum, dist, factorial
import pytest
        
NUMBER = 10

class TestSomething(TestCase):
    def test_ok(self):
        a = 10
        b = 20
        expected = 30
        res = sum(a, b)
        self.assertEqual(res, expected)
    # @expectedFailure  
    @pytest.mark.xfail  
    def test_failed(self):
         a = 10
         b = 20
         res = sum(a, b)
         self.assertGreater(res, 50)
         
         
    def test_error(self):
        a = 20
        b = "25"
        result = sum(a, b)
        expected = 45
        self.assertEqual(result, expected)
        
    def test_regex(self):
        date1 = "1999-01-01"
        date2 = "09.11.2023"
        date3 = "09/11/2023"
        
        pattern = r"^\d{2}\.\d{2}\.\d{4}$"
        self.assertRegex(date1, pattern)
        self.assertRegex(date2, pattern)
        self.assertRegex(date3, pattern)
        
    # @skipIf(NUMBER > 40, "Too big value")
    @pytest.mark.skipif(NUMBER > 40, "Too big value")
    def test_key_in_dist(self):
        key ="a"
        dist1 = dist()
        self.assertIn(key, dist1)
        
    @pytest.mark.parametrize(
        "number, expected",
        [
            (0, 1),
            (1, 1),
            (2, 2),
            (3, 6),
            (4, 24),
            (5, 120)
        ]
    )
    def test_factorial(number, expected):
        result = factorial(number)
        assert result == expected
        
    


class TestSomethingWithPytest:
 
    def test_equal(self):
        a = 10
        b = 20
        expected = 30
        res = sum(a, b)
        assert res == expected
        
    def test_failure():
        a = 10
        b = 20
        res = sum(a, b)
        assert res > 50