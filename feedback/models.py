# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Article(models.Model):
    articleid = models.IntegerField(primary_key=True)
    articletitle = models.CharField(max_length=255, blank=True, null=True)
    articleyear = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'article'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'), )


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'), )


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'), )


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'), )


class Author(models.Model):
    authorid = models.AutoField(primary_key=True)
    authorname = models.CharField(max_length=255, blank=True, null=True)
    authoremail = models.CharField(
        unique=True, max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'author'


class Divvytrips(models.Model):
    trip_id = models.IntegerField(primary_key=True)
    starttime = models.DateTimeField(blank=True, null=True)
    stoptime = models.DateTimeField(blank=True, null=True)
    bikeid = models.IntegerField(blank=True, null=True)
    tripduration = models.IntegerField(blank=True, null=True)
    from_station_id = models.IntegerField(blank=True, null=True)
    from_station_name = models.CharField(max_length=100, blank=True, null=True)
    to_station_id = models.IntegerField(blank=True, null=True)
    to_station_name = models.CharField(max_length=100, blank=True, null=True)
    usertype = models.CharField(max_length=30, blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True)
    birthyear = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'divvytrips'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey(
        'DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'), )


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Duosarticle(models.Model):
    articleid = models.AutoField(primary_key=True)
    articletitle = models.CharField(max_length=255)
    articleyear = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'duosarticle'


class Duosauthor(models.Model):
    emailaddress = models.CharField(max_length=255)
    authorid = models.AutoField(primary_key=True)
    authorname = models.CharField(max_length=255)

    def __str__(self):
        return self.authorname

    class Meta:
        managed = False
        db_table = 'duosauthor'


class Duosdataset(models.Model):
    datasetid = models.AutoField(primary_key=True)
    datasetname = models.CharField(max_length=255)
    abbreviation = models.CharField(max_length=5)

    class Meta:
        managed = False
        db_table = 'duosdataset'


class Duosemail(models.Model):
    hash = models.CharField(unique=True, max_length=255, blank=True, null=True)
    emailid = models.AutoField(primary_key=True)
    authorid = models.ForeignKey(
        Duosauthor,
        models.DO_NOTHING,
        db_column='authorid',
        blank=True,
        null=True)
    articleid = models.ForeignKey(
        Article,
        models.DO_NOTHING,
        db_column='articleid',
        blank=True,
        null=True)

    class Meta:
        managed = False
        db_table = 'duosemail'


class Duosreference(models.Model):
    refid = models.AutoField(primary_key=True)
    datasetid = models.ForeignKey(
        Duosdataset, models.DO_NOTHING, db_column='datasetid')
    articleid = models.ForeignKey(
        Duosarticle, models.DO_NOTHING, db_column='articleid')

    class Meta:
        managed = False
        db_table = 'duosreference'


class Duosvalidation(models.Model):
    action = models.CharField(max_length=255, blank=True, null=True)
    comment = models.CharField(max_length=255, blank=True, null=True)
    time_stamp = models.DateTimeField()
    validationid = models.AutoField(primary_key=True)
    emailid = models.ForeignKey(
        Duosemail, models.DO_NOTHING, db_column='emailid')
    refid = models.ForeignKey(
        Duosreference, models.DO_NOTHING, db_column='refid')

    class Meta:
        managed = False
        db_table = 'duosvalidation'


class Duoswrites(models.Model):
    articleid = models.ForeignKey(
        Duosarticle, models.DO_NOTHING, db_column='articleid')
    authorid = models.ForeignKey(
        Duosauthor, models.DO_NOTHING, db_column='authorid')

    class Meta:
        managed = False
        db_table = 'duoswrites'


class Refs(models.Model):
    refid = models.AutoField(primary_key=True)
    objectlabel = models.CharField(max_length=13, blank=True, null=True)
    datasetname = models.CharField(max_length=255, blank=True, null=True)
    context = models.TextField(blank=True, null=True)
    articleid = models.ForeignKey(
        Article,
        models.DO_NOTHING,
        db_column='articleid',
        blank=True,
        null=True)

    class Meta:
        managed = False
        db_table = 'refs'


class Validates(models.Model):
    validatesid = models.AutoField(primary_key=True)
    validatestoken = models.CharField(
        unique=True, max_length=255, blank=True, null=True)
    writesid = models.ForeignKey(
        'Writes',
        models.DO_NOTHING,
        db_column='writesid',
        blank=True,
        null=True)
    createdat = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'validates'


class Validation(models.Model):
    validationid = models.AutoField(primary_key=True)
    refid = models.ForeignKey(
        Refs, models.DO_NOTHING, db_column='refid', blank=True, null=True)
    validationchoice = models.CharField(max_length=13, blank=True, null=True)
    validationcomment = models.TextField(blank=True, null=True)
    updatedat = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'validation'


class Writes(models.Model):
    writesid = models.AutoField(primary_key=True)
    articleid = models.ForeignKey(
        Article,
        models.DO_NOTHING,
        db_column='articleid',
        blank=True,
        null=True)
    authorid = models.ForeignKey(
        Author, models.DO_NOTHING, db_column='authorid', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'writes'
