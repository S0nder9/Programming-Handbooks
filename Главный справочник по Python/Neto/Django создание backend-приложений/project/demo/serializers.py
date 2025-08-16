from django.forms import ValidationError
from rest_framework import serializers

from demo.models import Adv, Comment, Message, Weapon

class WeaponSerializer(serializers.Serializer):
    power = serializers.IntegerField()
    rarity = serializers.CharField()
    
class WeaponSerializer(serializers.ModelSerializer):
   class Meta():
       model = Weapon
       fields = ["id", 'power', 'rarity', 'value']
       
class CommentSerializer(serializers.ModelSerializer):
    text = serializers.CharField(min_length=10)
    
    
    class Meta():
        model = Comment
        fields = ['id', "text", "created_at", "user"]
        
    def validate_text(self, value):
        if "text" in value: raise ValidationError("Вы использовали запрещенное слово")
        
        return value
    
    def validate(self, attrs):
        if "hello" in attrs["text"].lower() or attrs["user"] == 1: raise ValidationError("Что-то пошло не так")
        return attrs
    
    def create(self, validated_data):
        print(validated_data)
        return super().create(validated_data)

class AdvSerializer(serializers.ModelSerializer):
    class Meta():
        model = Adv
        fields = ['id', "text", "created_at", "user", "status"]
        read_only_fields = ["user"]

#-----------------------------------------------

class MessageSerializer(serializers.ModelSerializer):
    class Meta():
        model = Message
        fields = ['id', "text", "created_at", "user"]