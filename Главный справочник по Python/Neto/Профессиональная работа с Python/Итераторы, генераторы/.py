class MyRange:
    
    def __init__ (self, start, end):
        self.start = start
        self.end = end
    
    def __iter__ (self):
        self.currentValue = self.start - 1
        return self
    
    def __next__ (self):
        self.currentValue += 1
        
        if self.currentValue > self.end:
            
            raise StopIteration
    
        return self.currentValue
    

for i in MyRange(-1, 10):
    print(i)